/*
  Warnings:

  - The values [CANCELLED] on the enum `PactStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FORFIET] on the enum `StakeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `pact` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PactStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'FAILED', 'DECLINED');
ALTER TABLE "Pact" ALTER COLUMN "status" TYPE "PactStatus_new" USING ("status"::text::"PactStatus_new");
ALTER TYPE "PactStatus" RENAME TO "PactStatus_old";
ALTER TYPE "PactStatus_new" RENAME TO "PactStatus";
DROP TYPE "public"."PactStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StakeType_new" AS ENUM ('MONEY', 'FORFEIT', 'PUBLIC_SHAME');
ALTER TABLE "Pact" ALTER COLUMN "stakeType" TYPE "StakeType_new" USING ("stakeType"::text::"StakeType_new");
ALTER TYPE "StakeType" RENAME TO "StakeType_old";
ALTER TYPE "StakeType_new" RENAME TO "StakeType";
DROP TYPE "public"."StakeType_old";
COMMIT;

-- DropTable
DROP TABLE "pact";

-- CreateTable
CREATE TABLE "Pact" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "partnerId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "PactStatus" NOT NULL DEFAULT 'PENDING',
    "stakeType" "StakeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pact_pkey" PRIMARY KEY ("id")
);
