import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "~/env";

export type IndexConfig = {
  name: string;
  dimensions: number;
};

export const INDEX_TEST: IndexConfig = {
  name: "property-match-test",
  dimensions: 1024,
};

export function getPCClient(): Pinecone {
  return new Pinecone({
    apiKey: env.PINECONE_API_KEY,
  });
}
