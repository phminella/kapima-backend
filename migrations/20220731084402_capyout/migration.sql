/*
  Warnings:

  - You are about to drop the `Capy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Capy" DROP CONSTRAINT "Capy_user_fkey";

-- DropTable
DROP TABLE "Capy";
