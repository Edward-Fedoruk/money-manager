import { check, integer, numeric, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps.helper";
import { Categories } from "./categories";
import { SubCategories } from "./sub-category";
import { sql } from "drizzle-orm";

export const transactionType = pgEnum("transaction_type", ["expense", "income"]);

export const Transactions = pgTable(
    "Transactions",
    {
        id: serial().primaryKey().unique(),
        categoryId: integer()
            .references(() => Categories.id, {
                onDelete: "set default",
            })
            .notNull()
            .default(1),
        subcategoryId: integer().references(() => SubCategories.id, {
            onDelete: "set null",
        }),
        description: text(),
        price: numeric({ precision: 2 }).notNull(),
        currency: text().notNull(),
        type: transactionType().notNull(),
        ...timestamps,
    },
    (table) => ({
        checkConstraint: check("description_size_check", sql`${table.description} < 255`),
    }),
);
