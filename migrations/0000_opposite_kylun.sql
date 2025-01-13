CREATE TABLE `files` (
	`id` integer PRIMARY KEY NOT NULL,
	`userID` integer,
	`fileName` text NOT NULL,
	`key` text NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_key_unique` ON `files` (`key`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `temporaryURLs` (
	`id` text PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);