/*
  Warnings:

  - Made the column `gender` on table `Shrimp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shrimp" ALTER COLUMN "gender" SET NOT NULL;
