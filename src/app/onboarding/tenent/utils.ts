import type { AIResponse, ProfileData } from "./types";

// Field mapping configuration: database field -> AI response field
const FIELD_MAPPINGS = {
  brandName: "businessOrBrandName",
  industry: "businessIndustryType",
  tennentExperience: "businessExperienceLevel",
  spaceLooking: "preferredSpaceTypes",
  spaceNeed: "requiredSquareFootage",
  rentRangeDesire: "monthlyRentBudgetAmount",
  cityNext: "targetExpansionCities",
  whenNextOpen: "businessOpeningTimeline",
  typcialCustomer: "targetCustomerDemographics",
  typcialCustomerSpend: "customerAverageSpendingRange",
  personalityTags: "brandPersonalityTraits",
  brandKeywords: "brandDescriptiveKeywords",
  toneTags: "brandToneAndVoiceStyle",
  notes: "additionalBusinessNotes",
  logoUrl: "logoUrl",
} as const;

// Array fields that should default to empty array instead of null
const ARRAY_FIELDS = new Set([
  "spaceLooking",
  "cityNext",
  "typcialCustomer",
  "personalityTags",
  "brandKeywords",
  "toneTags",
]);

// Mapping function to convert AI response to database format
export const mapAIResponseToProfileData = (aiResponse: any): ProfileData => {
  // Handle both old format (profileData) and new format (tenantProfile)
  const data = aiResponse.tenantProfile || aiResponse.profileData || aiResponse;

  const result: ProfileData = {};

  // Map each field using the configuration
  Object.entries(FIELD_MAPPINGS).forEach(([dbField, aiField]) => {
    const key = dbField as keyof ProfileData;
    const value = data[aiField];

    if (value != null) {
      result[key] = value;
    } else if (ARRAY_FIELDS.has(key)) {
      // Set empty array for array fields
      (result as any)[key] = [];
    }
    // For other fields, leave undefined (don't set null)
  });

  return result;
};

// Clean and parse AI response
// Repair common JSON syntax errors
const repairJSON = (jsonString: string): string => {
  let repaired = jsonString;
  
  // Fix common range expressions like "2500-5000" to middle value
  repaired = repaired.replace(/:\s*(\d+)-(\d+)/g, (match, start, end) => {
    const middle = Math.round((parseInt(start) + parseInt(end)) / 2);
    console.log(`🔧 Repaired range ${start}-${end} to ${middle}`);
    return `: ${middle}`;
  });
  
  // Fix unquoted property names (though this shouldn't happen with our prompt)
  repaired = repaired.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  
  return repaired;
};

// Extract JSON objects from text using balanced bracket matching
const extractJSONObjects = (text: string): string[] => {
  const jsonObjects: string[] = [];
  let braceCount = 0;
  let startIndex = -1;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '{') {
      if (braceCount === 0) {
        startIndex = i;
      }
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0 && startIndex !== -1) {
        const jsonCandidate = text.substring(startIndex, i + 1);
        try {
          // Try to parse as-is first
          JSON.parse(jsonCandidate);
          jsonObjects.push(jsonCandidate);
        } catch {
          // Try to repair and parse
          try {
            const repaired = repairJSON(jsonCandidate);
            JSON.parse(repaired);
            jsonObjects.push(repaired);
            console.log("🔧 JSON repaired successfully");
          } catch {
            // Still not valid JSON, continue
          }
        }
        startIndex = -1;
      }
    }
  }
  
  return jsonObjects;
};

export const parseAIResponse = (
  response: string,
): { displayContent: string; profileData?: ProfileData } => {
  const trimmedResponse = response.trim();
  let displayContent = trimmedResponse;
  let profileData: ProfileData | undefined;

  try {
    // Check if the entire response is pure JSON
    if (trimmedResponse.startsWith("{") && trimmedResponse.endsWith("}")) {
      const parsed = JSON.parse(trimmedResponse) as AIResponse;
      const aiProfileData = parsed.data?.tenantProfile || parsed.tenantProfile;

      if (aiProfileData) {
        profileData = mapAIResponseToProfileData(aiProfileData);
        displayContent =
          parsed.resp ||
          "Perfect! Here's your complete profile. Ready to find your ideal space?";
        return { displayContent, profileData };
      }
    }

    // Check for JSON in code blocks first
    const codeBlockMatch = trimmedResponse.match(/```json\s*([\s\S]*?)\s*```/);
    let jsonToProcess = null;
    let textBeforeJson = "";

    if (codeBlockMatch) {
      jsonToProcess = codeBlockMatch[1];
      textBeforeJson = trimmedResponse.substring(0, codeBlockMatch.index).trim();
    } else {
      // Use improved JSON extraction for mixed content
      const jsonObjects = extractJSONObjects(trimmedResponse);
      
      if (jsonObjects.length > 0) {
        // Use the last (most complete) JSON object found
        jsonToProcess = jsonObjects[jsonObjects.length - 1];
        const jsonIndex = trimmedResponse.lastIndexOf(jsonToProcess!);
        textBeforeJson = trimmedResponse.substring(0, jsonIndex).trim();
      }
    }

    if (jsonToProcess) {
      let parsed: AIResponse;
      
      try {
        // Try to parse as-is first
        parsed = JSON.parse(jsonToProcess) as AIResponse;
      } catch (parseError) {
        // Try to repair and parse
        console.log("🔧 JSON parse failed, attempting repair");
        const repaired = repairJSON(jsonToProcess);
        parsed = JSON.parse(repaired) as AIResponse;
        console.log("✅ JSON repaired and parsed successfully");
      }
      
      const aiProfileData = parsed.data?.tenantProfile || parsed.tenantProfile;

      if (aiProfileData) {
        profileData = mapAIResponseToProfileData(aiProfileData);

        // Priority: resp field from JSON > text before JSON > default message
        displayContent =
          parsed.resp ||
          textBeforeJson ||
          "Perfect! Here's your complete profile. Ready to find your ideal space?";
      } else if (parsed.resp) {
        displayContent = parsed.resp;
      }
    }
  } catch (parseError) {
    // If parsing fails, use the original response
    displayContent = trimmedResponse;
  }

  return { displayContent, profileData };
};

// Create request body for chat API
export const createChatRequestBody = (
  messages: any[],
  conversationContext: any,
  aggregatedData: any,
) => ({
  messages: messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  })),
  context: {
    questionCount: conversationContext.questionCount,
    aggregatedData: aggregatedData,
    completedQuestions: conversationContext.completedQuestions,
  },
});

// Handle streaming response
export const handleStreamingResponse = async (
  response: Response,
): Promise<string> => {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  let assistantMessage = "";
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    assistantMessage += chunk;
  }

  return assistantMessage;
};

// Create error with timeout handling
export const createTimeoutError = (error: unknown): Error => {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return new Error("Request timed out. Please try again.");
    }
    if (
      error.message.includes("terminated") ||
      error.message.includes("SocketError")
    ) {
      return new Error("Connection was interrupted. Please try again.");
    }
    if (error.message.includes("fetch")) {
      return new Error(
        "Network error. Please check your connection and try again.",
      );
    }
  }
  return error as Error;
};
