import type { User } from "better-auth";
import { db } from "~/server/db";


export async function findTenantProfileByUserId(user: User) {
  return await db.tenantProfile.findUnique({
    where: { userId: user.id },
  });
}