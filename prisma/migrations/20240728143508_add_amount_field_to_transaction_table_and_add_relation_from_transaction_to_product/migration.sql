/*
  Warnings:

  - You are about to drop the column `stock` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `transactionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `stock`,
    ADD COLUMN `amount` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
