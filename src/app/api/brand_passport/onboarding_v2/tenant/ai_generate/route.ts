import { NextResponse } from "next/server";
import { nullthrows } from "~/lib/utils";
import { getClient, GPT_4O_MINI } from "~/server/external_api/openai";

export async function POST(req: Request) {
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

  const { message, context } = body;

  console.log(body);

  try {
    const openAI = getClient();
    const result = await openAI.chat.completions.create({
      model: GPT_4O_MINI,
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `You are a real estate agent. Your are helping tenants to build their profile. Your answer need to be succint and professional. Please only respond with the final answer.`,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${context}\n\n${message}`,
            },
          ],
        },
      ],
    });
    const answer = nullthrows(result.choices[0]?.message?.content);
    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chat API error:", error);

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
