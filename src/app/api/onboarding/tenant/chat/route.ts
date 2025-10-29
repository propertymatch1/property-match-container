import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { TENANT_ONBOARDING_SYSTEM_PROMPT } from "~/lib/constants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { messages, context } = body;

    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format - must be an array" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array cannot be empty" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Validate message structure
    for (const message of messages) {
      if (!message.role || !message.content) {
        return new Response(
          JSON.stringify({
            error: "Each message must have role and content fields",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      if (!["user", "assistant", "system"].includes(message.role)) {
        return new Response(
          JSON.stringify({
            error: "Invalid message role - must be user, assistant, or system",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    // Build enhanced system prompt with conversation context
    let enhancedSystemPrompt = TENANT_ONBOARDING_SYSTEM_PROMPT;

    if (context) {
      const { questionCount, completedQuestions } = context;

      enhancedSystemPrompt += `\n\nCONVERSATION CONTEXT:
- Questions completed: ${questionCount || 0}/10
- Previously covered topics: ${Array.isArray(completedQuestions) && completedQuestions.length > 0 ? completedQuestions.slice(-3).join("; ") : "None"}

Use this context to:
1. Avoid repeating questions already asked
2. Reference previously collected information when relevant
3. Progress logically through the remaining questions
4. Only return JSON format when you've completed all 10 questions (question count >= 10)

${questionCount >= 9 ? "\n🚨 NEXT RESPONSE: You are at the end of onboarding. Provide the final JSON summary with all collected information." : ""}`;
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    try {
      const result = streamText({
        model: openai("gpt-4o"),
        system: enhancedSystemPrompt,
        messages,
        temperature: 0.7, // Balanced temperature for natural conversation
      });

      return result.toTextStreamResponse();
    } catch (streamError) {
      console.error("Streaming error:", streamError);

      // Return a user-friendly error message
      if (streamError instanceof Error) {
        if (
          streamError.message.includes("terminated") ||
          streamError.message.includes("SocketError")
        ) {
          return new Response(
            JSON.stringify({
              error: "Connection was interrupted. Please try again.",
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
        if (streamError.message.includes("timeout")) {
          return new Response(
            JSON.stringify({ error: "Request timed out. Please try again." }),
            {
              status: 408,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      }

      throw streamError; // Re-throw for other error handling
    }
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      // OpenAI API key errors
      if (
        error.message.includes("API key") ||
        error.message.includes("authentication")
      ) {
        return new Response(
          JSON.stringify({ error: "AI service authentication failed" }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Rate limit errors
      if (
        error.message.includes("rate limit") ||
        error.message.includes("quota")
      ) {
        return new Response(
          JSON.stringify({
            error: "AI service is busy. Please try again in a moment.",
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Network/timeout errors
      if (
        error.message.includes("timeout") ||
        error.message.includes("ETIMEDOUT")
      ) {
        return new Response(
          JSON.stringify({ error: "Request timeout. Please try again." }),
          {
            status: 408,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Connection errors
      if (
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("network")
      ) {
        return new Response(
          JSON.stringify({
            error: "Network connection failed. Please check your connection.",
          }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Model/content errors
      if (
        error.message.includes("content_filter") ||
        error.message.includes("safety")
      ) {
        return new Response(
          JSON.stringify({
            error: "Content not allowed. Please rephrase your message.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    // Generic server error
    return new Response(
      JSON.stringify({
        error: "AI service temporarily unavailable. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
