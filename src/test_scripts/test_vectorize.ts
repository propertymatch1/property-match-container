import { db } from "~/server/db";
import { createTextEmbedding } from "~/server/matching/vectordb/embedding";
import { persistProperty } from "~/server/matching/vectordb/property";

async function vectorizeAllProperty(): Promise<void> {
  const properties = await db.property.findMany();
  await properties.forEach(async (property) => await persistProperty(property));
}

vectorizeAllProperty();
