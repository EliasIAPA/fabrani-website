CREATE TABLE `closer_clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`mainPartner` varchar(255) NOT NULL,
	`cnpj` varchar(20),
	`cpf` varchar(14),
	`rg` varchar(20),
	`street` varchar(255),
	`number` varchar(20),
	`complement` varchar(100),
	`neighborhood` varchar(100),
	`city` varchar(100),
	`state` varchar(2),
	`zipCode` varchar(10),
	`whatsapp` varchar(30) NOT NULL,
	`closerId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `closer_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `closer_proposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`closerId` int NOT NULL,
	`projectType` enum('certificacao_mec','projeto_alianca','pos_mba_parceiros','mentoria_ni1') NOT NULL,
	`value` varchar(20) NOT NULL,
	`status` enum('enviada','fechada','perdida') NOT NULL DEFAULT 'enviada',
	`numberOfCourses` int DEFAULT 1,
	`observation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `closer_proposals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `closer_sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposalId` int NOT NULL,
	`clientId` int NOT NULL,
	`closerId` int NOT NULL,
	`projectType` enum('certificacao_mec','projeto_alianca','pos_mba_parceiros','mentoria_ni1') NOT NULL,
	`totalValue` varchar(20) NOT NULL,
	`paymentMethod` enum('cartao_credito','pix','boleto') NOT NULL,
	`installments` int DEFAULT 1,
	`downPayment` varchar(20),
	`installmentValue` varchar(20),
	`numberOfCourses` int DEFAULT 1,
	`observation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `closer_sales_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `closers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`passwordHash` varchar(255) NOT NULL,
	`role` enum('closer','admin') NOT NULL DEFAULT 'closer',
	`isActive` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `closers_id` PRIMARY KEY(`id`),
	CONSTRAINT `closers_email_unique` UNIQUE(`email`)
);
