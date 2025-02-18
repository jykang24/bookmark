-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(36) NOT NULL,
    `withdel` BOOLEAN NOT NULL DEFAULT false,
    `owner` MEDIUMINT UNSIGNED NOT NULL,

    INDEX `fk_Book_owner_User`(`owner`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mark` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `book` INTEGER UNSIGNED NOT NULL,
    `url` VARCHAR(1024) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `descript` VARCHAR(1000) NOT NULL,

    INDEX `fk_Mark_book`(`book`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(31) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `passwd` VARCHAR(128) NULL,
    `provider` VARCHAR(31) NOT NULL,
    `logindt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mark` ADD CONSTRAINT `mark_ibfk_1` FOREIGN KEY (`book`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
