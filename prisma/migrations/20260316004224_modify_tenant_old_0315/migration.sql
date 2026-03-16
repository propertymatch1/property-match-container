-- AlterTable
ALTER TABLE "TenantProfile" ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sessionKey" TEXT;
