/*
  Warnings:

  - You are about to drop the column `createdAt` on the `borrowRecords` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `borrowRecords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "borrowRecords" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "returnDate" DROP NOT NULL,
ALTER COLUMN "returnDate" DROP DEFAULT;
