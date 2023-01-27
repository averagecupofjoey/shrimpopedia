/*
  Warnings:

  - A unique constraint covering the columns `[email,id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `Shrimp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Shrimp` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Shrimp" DROP CONSTRAINT "Shrimp_ownerEmail_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Shrimp" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_id_key" ON "User"("email", "id");

-- AddForeignKey
ALTER TABLE "Shrimp" ADD CONSTRAINT "Shrimp_ownerEmail_ownerId_fkey" FOREIGN KEY ("ownerEmail", "ownerId") REFERENCES "User"("email", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
