import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps.helper";
import { Categories } from "./categories";

export const SubCategories = pgTable("Sub_categories", {
    id: serial().primaryKey().unique(),
    name: text().unique(),
    categoryId: integer()
        .notNull()
        .references(() => Categories.id, { onDelete: "cascade" }),
    ...timestamps,
});
