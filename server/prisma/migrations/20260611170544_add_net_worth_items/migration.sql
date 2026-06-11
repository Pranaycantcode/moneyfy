-- CreateEnum
CREATE TYPE "NetWorthItemType" AS ENUM ('ASSET', 'LIABILITY');

-- CreateTable
CREATE TABLE "NetWorthItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "NetWorthItemType" NOT NULL,
    "category" TEXT NOT NULL,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NetWorthItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NetWorthItem" ADD CONSTRAINT "NetWorthItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
