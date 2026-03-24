ALTER TABLE `closer_sales` ADD `mixedPaymentEnabled` enum('yes','no') DEFAULT 'no' NOT NULL;--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `pixDownPayment` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `cardInstallments` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `cardInstallmentValue` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `boletoInstallments` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `boletoInstallmentValue` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `proposalSentDate` timestamp;--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `expectedPaymentDate` timestamp;--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `paymentReceivedDate` timestamp;--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `paymentPlatform` varchar(100);--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `paymentId` varchar(255);--> statement-breakpoint
ALTER TABLE `closer_sales` ADD `paymentStatus` enum('pending','processing','completed','failed','refunded') DEFAULT 'pending' NOT NULL;