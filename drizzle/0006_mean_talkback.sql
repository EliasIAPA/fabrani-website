CREATE TABLE `closer_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`closerId` int NOT NULL,
	`closerName` varchar(255) NOT NULL,
	`action` enum('client_created','client_updated','client_deleted','proposal_created','proposal_updated','proposal_status_changed','proposal_deleted','proposal_pdf_exported','sale_created','sale_updated','sale_deleted','closer_created','closer_updated','closer_deleted','login','logout') NOT NULL,
	`entityType` enum('client','proposal','sale','closer','session') NOT NULL,
	`entityId` int,
	`description` text NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `closer_logs_id` PRIMARY KEY(`id`)
);
