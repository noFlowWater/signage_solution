/*
  Warnings:

  - You are about to drop the column `user_face_mode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `user_face_mode`,
    ADD COLUMN `user_face_model` LONGBLOB NULL;
