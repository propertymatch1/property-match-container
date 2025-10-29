/*
  Warnings:

  - You are about to drop the column `userEmail` on the `TenantProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `TenantProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."TenantProfile" DROP CONSTRAINT "TenantProfile_userEmail_fkey";

-- DropIndex
DROP INDEX "public"."TenantProfile_userEmail_idx";

-- DropIndex
DROP INDEX "public"."TenantProfile_userEmail_key";

-- AlterTable
ALTER TABLE "TenantProfile" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TenantProfile_userId_key" ON "TenantProfile"("userId");

-- CreateIndex
CREATE INDEX "TenantProfile_userId_idx" ON "TenantProfile"("userId");

-- AddForeignKey
ALTER TABLE "TenantProfile" ADD CONSTRAINT "TenantProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
