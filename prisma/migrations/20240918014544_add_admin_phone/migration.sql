/*
  Warnings:

  - Added the required column `phone` to the `Barberia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barberia" ADD COLUMN     "phone" TEXT NOT NULL;
