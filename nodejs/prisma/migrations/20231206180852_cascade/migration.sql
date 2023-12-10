-- DropForeignKey
ALTER TABLE `Relation_user_allergy` DROP FOREIGN KEY `Relation_user_allergy_userID_fkey`;

-- AddForeignKey
ALTER TABLE `Relation_user_allergy` ADD CONSTRAINT `Relation_user_allergy_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
