CREATE TABLE IF NOT EXISTS "Transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	CONSTRAINT "Transactions_id_unique" UNIQUE("id")
);
