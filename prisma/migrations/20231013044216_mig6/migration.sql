/*
  Warnings:

  - You are about to drop the column `stripe_current_period_end` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropIndex
DROP INDEX `User_stripe_customer_id_key` ON `User`;

-- DropIndex
DROP INDEX `User_stripe_subscription_id_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `stripe_current_period_end`,
    DROP COLUMN `stripe_customer_id`,
    DROP COLUMN `stripe_price_id`,
    DROP COLUMN `stripe_subscription_id`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Account`;
