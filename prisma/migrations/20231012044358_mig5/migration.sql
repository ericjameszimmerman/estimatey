/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `updated_at`;
