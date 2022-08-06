-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cart" UUID;

-- CreateTable
CREATE TABLE "CartItem" (
    "id" UUID NOT NULL,
    "user" UUID,
    "product" UUID,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CartItem_user_idx" ON "CartItem"("user");

-- CreateIndex
CREATE INDEX "CartItem_product_idx" ON "CartItem"("product");

-- CreateIndex
CREATE INDEX "Product_cart_idx" ON "Product"("cart");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cart_fkey" FOREIGN KEY ("cart") REFERENCES "CartItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
