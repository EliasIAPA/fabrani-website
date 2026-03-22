CREATE TABLE `blocked_ips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ip` varchar(45) NOT NULL,
	`reason` text,
	`totalSubmissions` int NOT NULL DEFAULT 0,
	`blockedBy` enum('auto','manual') NOT NULL DEFAULT 'auto',
	`isActive` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blocked_ips_id` PRIMARY KEY(`id`),
	CONSTRAINT `blocked_ips_ip_unique` UNIQUE(`ip`)
);
--> statement-breakpoint
CREATE TABLE `lead_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ip` varchar(45) NOT NULL,
	`fingerprint` varchar(64),
	`page` varchar(100) NOT NULL DEFAULT '/mec',
	`userAgent` text,
	`leadName` varchar(255),
	`leadEmail` varchar(320),
	`leadPhone` varchar(30),
	`isSuspicious` enum('no','yes') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lead_submissions_id` PRIMARY KEY(`id`)
);
