CREATE TABLE IF NOT EXISTS "Categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"updatedAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Categories_id_unique" UNIQUE("id"),
	CONSTRAINT "Categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Sub_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"categoryId" integer NOT NULL,
	"updatedAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Sub_categories_id_unique" UNIQUE("id"),
	CONSTRAINT "Sub_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Sub_categories" ADD CONSTRAINT "Sub_categories_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
INSERT INTO "Categories" ("name") VALUES ("Other")
