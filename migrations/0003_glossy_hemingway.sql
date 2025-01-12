ALTER TABLE "temporaryURLs" RENAME COLUMN "fileID" TO "userID";--> statement-breakpoint
ALTER TABLE "temporaryURLs" DROP CONSTRAINT "temporaryURLs_fileID_files_id_fk";
--> statement-breakpoint
ALTER TABLE "temporaryURLs" ADD CONSTRAINT "temporaryURLs_userID_users_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;