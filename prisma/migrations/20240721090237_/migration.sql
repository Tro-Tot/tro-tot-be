/*
  Warnings:

  - You are about to drop the `blacklistToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "blacklistToken";

-- CreateTable
CREATE TABLE "BlacklistToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlacklistToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistToken_token_key" ON "BlacklistToken"("token");
