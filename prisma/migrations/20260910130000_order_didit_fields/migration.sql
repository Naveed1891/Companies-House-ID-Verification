-- Didit identity-verification session fields on the order.
ALTER TABLE `Order`
  ADD COLUMN `diditSessionId` VARCHAR(191) NULL,
  ADD COLUMN `diditStatus` VARCHAR(40) NULL,
  ADD COLUMN `diditUrl` TEXT NULL;
