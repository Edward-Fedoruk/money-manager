CREATE TYPE "public"."transactiontype" AS ENUM('expense', 'income');--> statement-breakpoint
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
ALTER TABLE "Transactions" ADD COLUMN "categoryId" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "subcategoryId" integer;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "price" numeric(2) NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "currency" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "type" "transactiontype" NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "updatedAt" timestamp DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Sub_categories" ADD CONSTRAINT "Sub_categories_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE set default ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_subcategoryId_Sub_categories_id_fk" FOREIGN KEY ("subcategoryId") REFERENCES "public"."Sub_categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "description_size_check" CHECK (char_length("Transactions"."description") <= 255);
