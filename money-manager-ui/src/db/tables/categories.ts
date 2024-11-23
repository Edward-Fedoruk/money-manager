import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps.helper";

export const Categories = pgTable("Categories", {
    id: serial().primaryKey().unique(),
    name: text().unique(),
    ...timestamps,
});
