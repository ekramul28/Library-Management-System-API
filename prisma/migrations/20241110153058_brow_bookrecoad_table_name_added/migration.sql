/*
  Warnings:

  - You are about to drop the `BorrowRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BorrowRecord" DROP CONSTRAINT "BorrowRecord_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowRecord" DROP CONSTRAINT "BorrowRecord_memberId_fkey";

-- DropTable
DROP TABLE "BorrowRecord";

-- CreateTable
CREATE TABLE "borrowRecords" (
    "id" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "bookId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "borrowRecords_id_key" ON "borrowRecords"("id");

-- AddForeignKey
ALTER TABLE "borrowRecords" ADD CONSTRAINT "borrowRecords_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowRecords" ADD CONSTRAINT "borrowRecords_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
