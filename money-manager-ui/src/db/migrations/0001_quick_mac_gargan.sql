ALTER TABLE "Transactions" ADD COLUMN "categoryId" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "subcategoryId" integer;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "price" numeric(2) NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "currency" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "type" "transaction_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "updatedAt" timestamp DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
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
ALTER TABLE "Transactions" ADD CONSTRAINT "description_size_check" CHECK ("Transactions"."description" < 255);