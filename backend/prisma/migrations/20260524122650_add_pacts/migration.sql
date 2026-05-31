-- CreateEnum
CREATE TYPE "StakeType" AS ENUM ('MONEY', 'FORFIET', 'PUBLIC_SHAME');

-- CreateEnum
CREATE TYPE "PactStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED', 'PENDING', 'DECLINED');

-- CreateTable
CREATE TABLE "pact" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'active',
    "stakeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pact_pkey" PRIMARY KEY ("id")
);
