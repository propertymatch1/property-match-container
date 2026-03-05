-- CreateEnum
CREATE TYPE "ContactPreference" AS ENUM ('CHAT', 'EMAIL', 'CALL');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('LEASE', 'LOI', 'FINANCIAL', 'FLOOR_PLAN', 'PHOTO', 'OTHER');

-- CreateEnum
CREATE TYPE "LeaseType" AS ENUM ('GROSS', 'NNN', 'MODIFIED');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'MUTUAL_INTEREST', 'IN_DISCUSSION', 'LOI_SENT', 'SIGNED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'DOCUMENT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('AVAILABLE', 'PENDING', 'LEASED');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RETAIL', 'OFFICE', 'RESTAURANT', 'MIXED_USE', 'INDUSTRIAL');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TenantMode" AS ENUM ('FOUNDER', 'BRAND');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('TENANT', 'LANDLORD');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "uploaderEmail" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandlordProfile" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT,
    "phoneNumber" TEXT,
    "portfolioSize" INTEGER NOT NULL DEFAULT 0,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandlordProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "tenantEmail" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "landlordEmail" TEXT NOT NULL,
    "tenantInterested" BOOLEAN NOT NULL DEFAULT false,
    "landlordInterested" BOOLEAN NOT NULL DEFAULT false,
    "fitScore" DOUBLE PRECISION NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "messageType" "MessageType" NOT NULL DEFAULT 'TEXT',
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NegotiationRoom" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "tenantEmail" TEXT NOT NULL,
    "landlordEmail" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NegotiationRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "landlordEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "rentPerSqft" DOUBLE PRECISION NOT NULL,
    "leaseTermMinYears" INTEGER,
    "leaseTermMaxYears" INTEGER,
    "leaseType" "LeaseType" NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT NOT NULL,
    "contactPreference" "ContactPreference" NOT NULL DEFAULT 'CHAT',
    "desiredTenantTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDummy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertySpace" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "floorPlanUrl" TEXT,
    "squareFootage" INTEGER NOT NULL,
    "availabilityDate" TIMESTAMP(3) NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "PropertySpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantProfile" (
    "id" TEXT NOT NULL,
    "mode" "TenantMode" NOT NULL,
    "brandName" TEXT,
    "logoUrl" TEXT,
    "industry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cityNext" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "personalityTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rentRangeDesire" INTEGER,
    "spaceLooking" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tennentExperience" TEXT,
    "toneTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "typcialCustomer" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "typcialCustomerSpend" TEXT,
    "whenNextOpen" TEXT,
    "spaceNeed" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TenantProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_response" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "Q1" TEXT,
    "Q2" TEXT,
    "Q3" TEXT,
    "Q4" TEXT,
    "Q5" TEXT,
    "Q6" TEXT,
    "Q7" TEXT,
    "Q8" TEXT,
    "Q9" TEXT,
    "Q10" TEXT,
    "Q11" TEXT,
    "Q12" TEXT,
    "Q13" TEXT,
    "Q14" TEXT,
    "Q15" TEXT,
    "Q16" TEXT,
    "Q17" TEXT,
    "Q18" TEXT,
    "Q19" TEXT,
    "Q20" TEXT,
    "Q21" TEXT,
    "Q22" TEXT,
    "Q23" TEXT,
    "Q24" TEXT,
    "Q25" TEXT,
    "Q26" TEXT,
    "Q27" TEXT,
    "Q28" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "raw_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "userType" "UserType" NOT NULL,
    "companyName" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Document_documentType_idx" ON "Document"("documentType");

-- CreateIndex
CREATE INDEX "Document_roomId_idx" ON "Document"("roomId");

-- CreateIndex
CREATE INDEX "Document_uploaderEmail_idx" ON "Document"("uploaderEmail");

-- CreateIndex
CREATE UNIQUE INDEX "LandlordProfile_userEmail_key" ON "LandlordProfile"("userEmail");

-- CreateIndex
CREATE INDEX "LandlordProfile_userEmail_idx" ON "LandlordProfile"("userEmail");

-- CreateIndex
CREATE INDEX "LandlordProfile_verificationStatus_idx" ON "LandlordProfile"("verificationStatus");

-- CreateIndex
CREATE INDEX "Match_fitScore_idx" ON "Match"("fitScore");

-- CreateIndex
CREATE INDEX "Match_landlordEmail_idx" ON "Match"("landlordEmail");

-- CreateIndex
CREATE INDEX "Match_propertyId_idx" ON "Match"("propertyId");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "Match_tenantEmail_idx" ON "Match"("tenantEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Match_tenantEmail_propertyId_key" ON "Match"("tenantEmail", "propertyId");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- CreateIndex
CREATE INDEX "Message_roomId_idx" ON "Message"("roomId");

-- CreateIndex
CREATE INDEX "Message_senderEmail_idx" ON "Message"("senderEmail");

-- CreateIndex
CREATE UNIQUE INDEX "NegotiationRoom_matchId_key" ON "NegotiationRoom"("matchId");

-- CreateIndex
CREATE INDEX "NegotiationRoom_landlordEmail_idx" ON "NegotiationRoom"("landlordEmail");

-- CreateIndex
CREATE INDEX "NegotiationRoom_propertyId_idx" ON "NegotiationRoom"("propertyId");

-- CreateIndex
CREATE INDEX "NegotiationRoom_status_idx" ON "NegotiationRoom"("status");

-- CreateIndex
CREATE INDEX "NegotiationRoom_tenantEmail_idx" ON "NegotiationRoom"("tenantEmail");

-- CreateIndex
CREATE INDEX "Property_city_state_idx" ON "Property"("city", "state");

-- CreateIndex
CREATE INDEX "Property_propertyType_idx" ON "Property"("propertyType");

-- CreateIndex
CREATE INDEX "Property_rentPerSqft_idx" ON "Property"("rentPerSqft");

-- CreateIndex
CREATE INDEX "PropertySpace_squareFootage_idx" ON "PropertySpace"("squareFootage");

-- CreateIndex
CREATE INDEX "PropertySpace_status_idx" ON "PropertySpace"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TenantProfile_userId_key" ON "TenantProfile"("userId");

-- CreateIndex
CREATE INDEX "TenantProfile_brandName_idx" ON "TenantProfile"("brandName");

-- CreateIndex
CREATE INDEX "TenantProfile_industry_idx" ON "TenantProfile"("industry");

-- CreateIndex
CREATE INDEX "TenantProfile_rentRangeDesire_idx" ON "TenantProfile"("rentRangeDesire");

-- CreateIndex
CREATE INDEX "TenantProfile_spaceNeed_idx" ON "TenantProfile"("spaceNeed");

-- CreateIndex
CREATE INDEX "TenantProfile_userId_idx" ON "TenantProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "raw_response_userId_key" ON "raw_response"("userId");

-- CreateIndex
CREATE INDEX "raw_response_userId_idx" ON "raw_response"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_userType_idx" ON "user"("userType");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "NegotiationRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploaderEmail_fkey" FOREIGN KEY ("uploaderEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandlordProfile" ADD CONSTRAINT "LandlordProfile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_landlordEmail_fkey" FOREIGN KEY ("landlordEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tenantEmail_fkey" FOREIGN KEY ("tenantEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "NegotiationRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderEmail_fkey" FOREIGN KEY ("senderEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegotiationRoom" ADD CONSTRAINT "NegotiationRoom_landlordEmail_fkey" FOREIGN KEY ("landlordEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegotiationRoom" ADD CONSTRAINT "NegotiationRoom_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegotiationRoom" ADD CONSTRAINT "NegotiationRoom_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegotiationRoom" ADD CONSTRAINT "NegotiationRoom_tenantEmail_fkey" FOREIGN KEY ("tenantEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_landlordEmail_fkey" FOREIGN KEY ("landlordEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertySpace" ADD CONSTRAINT "PropertySpace_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantProfile" ADD CONSTRAINT "TenantProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
