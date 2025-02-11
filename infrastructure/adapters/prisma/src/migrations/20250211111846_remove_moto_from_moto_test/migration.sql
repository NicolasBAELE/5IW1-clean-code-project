/*
  Warnings:

  - Added the required column `moto` to the `MotoTest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MotoTest_motoId_idx";

-- AlterTable
ALTER TABLE "MotoTest" ADD COLUMN     "moto" TEXT NOT NULL;
