-- DropForeignKey
ALTER TABLE `MenuOrderInfo` DROP FOREIGN KEY `MenuOrderInfo_menuID_fkey`;

-- DropForeignKey
ALTER TABLE `MenuOrderInfo` DROP FOREIGN KEY `MenuOrderInfo_userID_fkey`;

-- AddForeignKey
ALTER TABLE `MenuOrderInfo` ADD CONSTRAINT `MenuOrderInfo_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuOrderInfo` ADD CONSTRAINT `MenuOrderInfo_menuID_fkey` FOREIGN KEY (`menuID`) REFERENCES `Menu`(`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE;
