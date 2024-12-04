-- Custom SQL migration file, put your code below! --

INSERT INTO "Categories" ("name") VALUES ('Other') ON CONFLICT (id) DO NOTHING;--> statement-breakpoint
