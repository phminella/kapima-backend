/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_image_fkey";

-- DropIndex
DROP INDEX "Product_image_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "_Product_image" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Product_image_AB_unique" ON "_Product_image"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_image_B_index" ON "_Product_image"("B");

-- AddForeignKey
ALTER TABLE "_Product_image" ADD CONSTRAINT "_Product_image_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_image" ADD CONSTRAINT "_Product_image_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
