/*
  Warnings:

  - Made the column `heatLevel` on table `Spices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Spices` MODIFY `heatLevel` VARCHAR(191) NOT NULL;
