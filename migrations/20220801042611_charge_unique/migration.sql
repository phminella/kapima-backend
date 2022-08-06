/*
  Warnings:

  - A unique constraint covering the columns `[charge]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_charge_key" ON "Order"("charge");
