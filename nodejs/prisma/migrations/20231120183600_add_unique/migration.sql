/*
  Warnings:

  - A unique constraint covering the columns `[allergy_name]` on the table `Allergy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[menu_name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Allergy_allergy_name_key` ON `Allergy`(`allergy_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Menu_menu_name_key` ON `Menu`(`menu_name`);
