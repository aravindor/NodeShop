/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `origin` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    DROP COLUMN `origin`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Spices` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `aroma` VARCHAR(191) NULL,
    `heatLevel` INTEGER NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Spices_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftSets` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GiftSets_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GiftSetsToSpices` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GiftSetsToSpices_AB_unique`(`A`, `B`),
    INDEX `_GiftSetsToSpices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Spices` ADD CONSTRAINT `Spices_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GiftSetsToSpices` ADD CONSTRAINT `_GiftSetsToSpices_A_fkey` FOREIGN KEY (`A`) REFERENCES `GiftSets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GiftSetsToSpices` ADD CONSTRAINT `_GiftSetsToSpices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Spices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
