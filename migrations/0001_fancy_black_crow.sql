ALTER TABLE "files" ADD COLUMN "fileName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_key_unique" UNIQUE("key");