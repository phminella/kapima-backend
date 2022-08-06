/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `Capy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Capy" ADD COLUMN     "user" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Capy_user_key" ON "Capy"("user");

-- AddForeignKey
ALTER TABLE "Capy" ADD CONSTRAINT "Capy_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
