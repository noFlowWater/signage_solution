-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(255) NOT NULL,
    `phoneNumber` CHAR(255) NOT NULL,
    `user_face_mode` LONGBLOB NULL,
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuOrderInfo` (
    `order_count` INTEGER NOT NULL,
    `last_order_time` DATETIME(3) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `menuID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userID`, `menuID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `menu_id` VARCHAR(191) NOT NULL,
    `menu_name` VARCHAR(255) NOT NULL,
    `menu_description` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `file_path` VARCHAR(2058) NULL,
    `is_soldout` BOOLEAN NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Allergy` (
    `allergy_id` VARCHAR(191) NOT NULL,
    `allergy_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`allergy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relation_user_allergy` (
    `userID` VARCHAR(191) NOT NULL,
    `allergyID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userID`, `allergyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Realtion_menu_allergy` (
    `menuID` VARCHAR(191) NOT NULL,
    `allergyID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`menuID`, `allergyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenuOrderInfo` ADD CONSTRAINT `MenuOrderInfo_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuOrderInfo` ADD CONSTRAINT `MenuOrderInfo_menuID_fkey` FOREIGN KEY (`menuID`) REFERENCES `Menu`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_user_allergy` ADD CONSTRAINT `Relation_user_allergy_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_user_allergy` ADD CONSTRAINT `Relation_user_allergy_allergyID_fkey` FOREIGN KEY (`allergyID`) REFERENCES `Allergy`(`allergy_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Realtion_menu_allergy` ADD CONSTRAINT `Realtion_menu_allergy_menuID_fkey` FOREIGN KEY (`menuID`) REFERENCES `Menu`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Realtion_menu_allergy` ADD CONSTRAINT `Realtion_menu_allergy_allergyID_fkey` FOREIGN KEY (`allergyID`) REFERENCES `Allergy`(`allergy_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
