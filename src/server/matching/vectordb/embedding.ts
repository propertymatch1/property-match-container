import { nullthrows } from "~/lib/utils";
import { getClient } from "~/server/external_api/openai";

export async function createTextEmbedding(text: string, dimensions: number): Promise<number[]> {
  const openai = getClient();
  const embeddings = await openai.embeddings.create({
    input: text,
    model: "text-embedding-3-small",
    dimensions,
  });
  return nullthrows(embeddings.data[0]?.embedding);
}
