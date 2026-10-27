-- Order sequence number + counter table, and one-time renumber of existing
-- orders into the DK-MMYYYY-NNNNN reference format starting at 10000.

-- AlterTable: add the global sequence number
ALTER TABLE `Order` ADD COLUMN `sequenceNo` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_sequenceNo_key` ON `Order`(`sequenceNo`);

-- CreateTable: atomic counters
CREATE TABLE `Counter` (
    `key` VARCHAR(64) NOT NULL,
    `value` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Backfill: assign sequence numbers to existing orders in creation order,
-- starting at 10000 (9999 + row number). Requires MySQL 8 / MariaDB 10.2+.
UPDATE `Order` o
JOIN (
    SELECT `id`, 9999 + ROW_NUMBER() OVER (ORDER BY `createdAt` ASC, `id` ASC) AS `seq`
    FROM `Order`
) r ON r.`id` = o.`id`
SET o.`sequenceNo` = r.`seq`;

-- Rewrite existing references to DK-<MMYYYY of createdAt>-<sequenceNo>.
UPDATE `Order`
SET `publicReference` = CONCAT('DK-', DATE_FORMAT(`createdAt`, '%m%Y'), '-', `sequenceNo`)
WHERE `sequenceNo` IS NOT NULL;

-- Seed the counter to the last used number (next order = value + 1).
-- Evaluates to 9999 when there are no existing orders, so the first new
-- order becomes 10000.
INSERT INTO `Counter` (`key`, `value`, `updatedAt`)
SELECT 'order_seq', COALESCE(MAX(`sequenceNo`), 9999), NOW(3) FROM `Order`;
