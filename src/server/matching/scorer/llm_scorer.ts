import type { Property } from "@prisma/client";
import type { MatchedProperty } from "../matcher";
import { getClient, GPT_4O_MINI } from "~/server/external_api/openai";
import { nullthrows } from "~/lib/utils";
import { extractJSON } from "../gpt_utils";

// TODO: replace with tenant profile
export async function scoreProperties(
  tenantQuery: string,
  properties: Property[],
): Promise<MatchedProperty[]> {
  const openAI = getClient();
  const propertiesPrompt = getPropertiesPrompt(properties);
  const result = await openAI.chat.completions.create({
    model: GPT_4O_MINI,
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are a professional commercial real estate broker. You are tasked to find the best properties to a specific client.`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Here are all the available properties:\n${propertiesPrompt}`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Here is the tenant's description of their needs and preferences: ${tenantQuery}
            
            Please evaluate how well each property match with the tenant and provide the following for each:
            - A score (between 0 and 10) of how well the property match with the tenant
            - One sentence to explain the match

            Give your answer in the following JSON array format: [{"index":"number", "score":"number", "explanation":"string"}]`,
          },
        ],
      },
    ],
  });

  const answer = nullthrows(result.choices[0]?.message?.content);
  const json = extractJSON(answer);

  return json.map((match: any) => {
    const property = properties[match.index];
    return {
      property,
      score: match.score,
      reason: match.explanation,
    };
  });
}

function getPropertiesPrompt(properties: Property[]): string {
  const prompts = properties.map((property, idx) => {
    const features = property.features
      .map((feature) => `- ${feature}`)
      .join("\n");
    return `Property Index: ${idx + 1}:

Description: ${property.description}

Features: ${features}`;
  });
  return prompts.join("\n\n");
}
