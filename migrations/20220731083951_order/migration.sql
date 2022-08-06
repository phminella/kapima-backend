-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "price" INTEGER,
    "quantity" INTEGER,
    "order" UUID,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "total" INTEGER,
    "user" UUID,
    "charge" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderProduct_image" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "OrderProduct_order_idx" ON "OrderProduct"("order");

-- CreateIndex
CREATE INDEX "Order_user_idx" ON "Order"("user");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderProduct_image_AB_unique" ON "_OrderProduct_image"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderProduct_image_B_index" ON "_OrderProduct_image"("B");

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderProduct_image" ADD CONSTRAINT "_OrderProduct_image_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderProduct_image" ADD CONSTRAINT "_OrderProduct_image_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
