import { INDEX_TEST } from "~/server/external_api/pinecone";
import { PropertyMatcher } from "~/server/matching/matcher";
import * as dotenv from 'dotenv';

async function tenantQuery(query: string): Promise<void> {
  const matcher = new PropertyMatcher(INDEX_TEST);
  const matches = await matcher.match(query);
  console.log(matches);
}

dotenv.config();
const query = "I want to open a virtual reality experience store. I would like a neighborhood that attracts people who are interested in technology.";
tenantQuery(query);