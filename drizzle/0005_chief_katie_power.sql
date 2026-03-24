ALTER TABLE `closer_proposals` ADD `paymentMethod` enum('cartao_credito','pix','boleto');--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `installments` int DEFAULT 1;--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `downPayment` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `installmentValue` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `mixedPaymentEnabled` enum('yes','no') DEFAULT 'no' NOT NULL;--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `pixDownPayment` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `cardInstallments` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `cardInstallmentValue` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `boletoInstallments` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `boletoInstallmentValue` varchar(20);--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `proposalSentDate` timestamp;--> statement-breakpoint
ALTER TABLE `closer_proposals` ADD `expectedPaymentDate` timestamp;--> statement-breakpoint
ALTER TABLE `closer_sales` DROP COLUMN `proposalSentDate`;--> statement-breakpoint
ALTER TABLE `closer_sales` DROP COLUMN `expectedPaymentDate`;--> statement-breakpoint
ALTER TABLE `closer_sales` DROP COLUMN `paymentReceivedDate`;