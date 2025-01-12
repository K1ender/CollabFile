CREATE TABLE "temporaryURLs" (
	"id" text PRIMARY KEY NOT NULL,
	"fileID" integer,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "temporaryURLs" ADD CONSTRAINT "temporaryURLs_fileID_files_id_fk" FOREIGN KEY ("fileID") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE cascade;