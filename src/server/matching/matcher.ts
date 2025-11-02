import type { Property } from "@prisma/client";
import { search } from "./vectordb/pinecone";
import { createTextEmbedding } from "./vectordb/embedding";
import { db } from "../db";
import type { IndexConfig } from "../external_api/pinecone";
import { scoreProperties } from "./scorer/llm_scorer";

export type MatchedProperty = {
  property: Property;
  score: number;
  reason: string;
};

export class PropertyMatcher {
  indexConfig: IndexConfig;

  constructor(indexConfig: IndexConfig) {
    this.indexConfig = indexConfig;
  }

  // TODO: replace with tenant profile
  async match(tenantQuery: string): Promise<MatchedProperty[]> {
    // tenant embedding
    const embedding = await createTextEmbedding(
      tenantQuery,
      this.indexConfig.dimensions,
    );

    // search for matches
    const matches = await search("property", this.indexConfig, embedding);
    const properties = await Promise.all(
      matches.map(
        async (match) =>
          await db.property.findUniqueOrThrow({
            where: { id: match.id },
          }),
      ),
    );

    // Scoring and ranking
    const scoredMatches = await scoreProperties(tenantQuery, properties);
    return scoredMatches.sort((match) => -match.score);
  }
}
