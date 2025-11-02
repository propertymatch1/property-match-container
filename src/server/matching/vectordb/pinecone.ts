import {
  type PineconeRecord,
  type RecordMetadata,
} from "@pinecone-database/pinecone";
import { getPCClient, type IndexConfig } from "~/server/external_api/pinecone";

type RawQueryResult = {
  id: string;
  score: number;
};

export async function upsert(
  namespace: string,
  indexConfig: IndexConfig,
  data: PineconeRecord<RecordMetadata>[],
): Promise<void> {
  const pc = getPCClient();
  const index = pc.Index(indexConfig.name);
  await index.namespace(namespace).upsert(data);
}

export async function search(
  namespace: string,
  indexConfig: IndexConfig,
  embedding: number[],
  topK = 10,
): Promise<RawQueryResult[]> {
  const pc = getPCClient();
  const index = pc.Index(indexConfig.name);
  const response = await index.namespace(namespace).query({
    vector: embedding,
    topK,
  });

  return response.matches.map((m) => {
    return { id: m.id, score: m.score ?? 0 };
  });
}
