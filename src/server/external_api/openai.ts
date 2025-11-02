import { OpenAI } from "openai";
import { env } from "~/env";

export const GPT_4O_MINI = "gpt-4o-mini";

export function getClient(): OpenAI {
  return new OpenAI({ apiKey: env.OPENAI_API_KEY });
}
