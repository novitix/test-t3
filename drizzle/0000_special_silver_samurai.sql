CREATE TABLE `test-t3_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `test-t3_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `test-t3_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`createdById` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `test-t3_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `test-t3_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `test-t3_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `test-t3_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `test-t3_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `test-t3_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `test-t3_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `test-t3_account` ADD CONSTRAINT `test-t3_account_userId_test-t3_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `test-t3_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `test-t3_post` ADD CONSTRAINT `test-t3_post_createdById_test-t3_user_id_fk` FOREIGN KEY (`createdById`) REFERENCES `test-t3_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `test-t3_session` ADD CONSTRAINT `test-t3_session_userId_test-t3_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `test-t3_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `test-t3_account` (`userId`);--> statement-breakpoint
CREATE INDEX `createdById_idx` ON `test-t3_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `test-t3_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `test-t3_session` (`userId`);