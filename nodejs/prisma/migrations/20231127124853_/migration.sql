/*
  Warnings:

  - You are about to drop the `Realtion_menu_allergy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Realtion_menu_allergy` DROP FOREIGN KEY `Realtion_menu_allergy_allergyID_fkey`;

-- DropForeignKey
ALTER TABLE `Realtion_menu_allergy` DROP FOREIGN KEY `Realtion_menu_allergy_menuID_fkey`;

-- DropTable
DROP TABLE `Realtion_menu_allergy`;

-- CreateTable
CREATE TABLE `Relation_menu_allergy` (
    `menuID` VARCHAR(191) NOT NULL,
    `allergyID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`menuID`, `allergyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Relation_menu_allergy` ADD CONSTRAINT `Relation_menu_allergy_menuID_fkey` FOREIGN KEY (`menuID`) REFERENCES `Menu`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_menu_allergy` ADD CONSTRAINT `Relation_menu_allergy_allergyID_fkey` FOREIGN KEY (`allergyID`) REFERENCES `Allergy`(`allergy_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
