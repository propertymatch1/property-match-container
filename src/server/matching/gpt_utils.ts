import { nullthrows } from "~/lib/utils";

export function extractJSON(answer: string | null): any {
  const jsonMatch = answer?.match(/\`\`\`json([\S\s]*)\`\`\`/);
  if (!jsonMatch) {
    return null;
  }

  const jsonString = nullthrows(jsonMatch[1]);
  return JSON.parse(jsonString);
}
