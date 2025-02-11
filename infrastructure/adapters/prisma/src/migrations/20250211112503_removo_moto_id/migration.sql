/*
  Warnings:

  - You are about to drop the column `motoId` on the `IncidentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `motoId` on the `MotoTest` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "IncidentHistory_motoId_idx";

-- AlterTable
ALTER TABLE "IncidentHistory" DROP COLUMN "motoId";

-- AlterTable
ALTER TABLE "MotoTest" DROP COLUMN "motoId";
