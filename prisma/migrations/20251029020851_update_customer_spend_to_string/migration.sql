/*
  Warnings:

  - You are about to drop the column `aiReadinessScore` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `avgUnitSales` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `expansion` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `foundedYear` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hqCity` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `numStores` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `readiness` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `revenueRange` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `signals` on the `TenantProfile` table. All the data in the column will be lost.
  - You are about to drop the column `storyText` on the `TenantProfile` table. All the data in the column will be lost.
  - Added the required column `brandPersonality` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentRangeDesire` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tennentExperience` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typcialCustomerSpend` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whenNextOpen` to the `TenantProfile` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `spaceNeed` on the `TenantProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "public"."TenantProfile_aiReadinessScore_idx";

-- DropIndex
DROP INDEX "public"."TenantProfile_hqCity_idx";

-- AlterTable
ALTER TABLE "TenantProfile" DROP COLUMN "aiReadinessScore",
DROP COLUMN "avgUnitSales",
DROP COLUMN "expansion",
DROP COLUMN "foundedYear",
DROP COLUMN "hqCity",
DROP COLUMN "numStores",
DROP COLUMN "readiness",
DROP COLUMN "revenueRange",
DROP COLUMN "signals",
DROP COLUMN "storyText",
ADD COLUMN     "brandKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "brandPersonality" TEXT NOT NULL,
ADD COLUMN     "cityNext" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "personalityTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "rentRangeDesire" INTEGER NOT NULL,
ADD COLUMN     "spaceLooking" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tennentExperience" TEXT NOT NULL,
ADD COLUMN     "toneTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "typcialCustomer" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "typcialCustomerSpend" TEXT NOT NULL,
ADD COLUMN     "whenNextOpen" TEXT NOT NULL,
DROP COLUMN "spaceNeed",
ADD COLUMN     "spaceNeed" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "TenantProfile_brandName_idx" ON "TenantProfile"("brandName");

-- CreateIndex
CREATE INDEX "TenantProfile_spaceNeed_idx" ON "TenantProfile"("spaceNeed");

-- CreateIndex
CREATE INDEX "TenantProfile_rentRangeDesire_idx" ON "TenantProfile"("rentRangeDesire");
