/*
  Warnings:

  - You are about to drop the column `phone` on the `Barberia` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Barberia" DROP COLUMN "phone";
