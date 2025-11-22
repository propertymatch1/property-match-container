import { Pinecone } from "@pinecone-database/pinecone";
import { nullthrows } from "~/lib/utils";
// import { env } from "~/env";

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
    apiKey: nullthrows(process.env.PINECONE_API_KEY),
  });
}
