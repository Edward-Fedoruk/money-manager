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
        categoryId: integer().references(() => Categories.id, {
            onDelete: "set null",
        }),
        subcategory: integer().references(() => SubCategories.id, {
            onDelete: "set null",
        }),
        description: text(),
        price: numeric({ precision: 2 }),
        currency: text(),
        type: transactionType(),
        ...timestamps,
    },
    (table) => ({
        checkConstraint: check("description_size_check", sql`${table.description} < 255`),
    }),
);
