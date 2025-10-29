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
export const parseAIResponse = (
  response: string,
): { displayContent: string; profileData?: ProfileData } => {
  let displayContent = response;
  let profileData: ProfileData | undefined;

  try {
    // Clean up potential markdown code blocks
    let cleanedMessage = response.trim();
    if (cleanedMessage.startsWith("```json")) {
      cleanedMessage = cleanedMessage
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    }

    // Try to extract JSON from the response
    const jsonMatch = cleanedMessage.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as AIResponse;

      // Handle both old and new response formats
      const aiProfileData =
        parsed.data?.tenantProfile ||
        parsed.data?.profileData ||
        parsed.tenantProfile ||
        parsed.profileData;

      if (aiProfileData) {
        // Map AI response to our database format
        profileData = mapAIResponseToProfileData(aiProfileData);
        console.log("✅ Final profile data extracted and mapped:", profileData);
      }

      if (parsed.resp) {
        displayContent = parsed.resp;
      }
    }
  } catch (parseError) {
    console.log("Could not parse final JSON, using text response");
    // Just use the text response as-is
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
