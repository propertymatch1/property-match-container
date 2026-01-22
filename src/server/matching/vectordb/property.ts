import type {
  PineconeRecord,
  RecordMetadata,
} from "@pinecone-database/pinecone";
import type { Property } from "@prisma/client";
import { createTextEmbedding } from "./embedding";
import { upsert } from "./pinecone";
import { INDEX_TEST, type IndexConfig } from "~/server/external_api/pinecone";

export async function persistProperty(
  property: Property,
  indexConfig: IndexConfig,
): Promise<void> {
  const record = await constructPropertyRecord(property);
  await upsert("property", indexConfig, [record]);
}

async function constructPropertyRecord(
  property: Property,
): Promise<PineconeRecord<RecordMetadata>> {
  const metadata = {
    city: property.city,
    state: property.state,
    rentPerSqft: property.rentPerSqft,
  };

  const naturalLanguage = getPropertyNaturalLanguage(property);
  const embedding = await createTextEmbedding(
    naturalLanguage,
    INDEX_TEST.dimensions,
  );

  return {
    id: property.id,
    values: embedding,
    metadata: metadata,
  };
}

function getPropertyNaturalLanguage(property: Property): string {
  const description = property.description;
  const features = property.features;
  const neighborhood = property.neighborhood;
  const desiredTenantTypes = property.desiredTenantTypes;

  let output = description + " " + neighborhood;

  features.forEach((feature) => {
    output += " " + feature;
  });

  desiredTenantTypes.forEach((desiredTenantType) => {
    output += " " + desiredTenantType;
  });

  return output;
}
