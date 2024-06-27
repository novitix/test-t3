CREATE TABLE `test-t3_networth` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256) NOT NULL,
	`amount` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `test-t3_networth_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `test-t3_post`;