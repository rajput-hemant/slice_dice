CREATE TABLE `employee` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`currency` text NOT NULL,
	`salary` real DEFAULT 0 NOT NULL,
	`department` text NOT NULL,
	`sub_department` text NOT NULL,
	`on_contract` integer DEFAULT false NOT NULL
);
