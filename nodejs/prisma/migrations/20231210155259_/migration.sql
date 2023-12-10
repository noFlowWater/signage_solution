-- DropForeignKey
ALTER TABLE `Relation_menu_allergy` DROP FOREIGN KEY `Relation_menu_allergy_menuID_fkey`;

-- AddForeignKey
ALTER TABLE `Relation_menu_allergy` ADD CONSTRAINT `Relation_menu_allergy_menuID_fkey` FOREIGN KEY (`menuID`) REFERENCES `Menu`(`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE;
