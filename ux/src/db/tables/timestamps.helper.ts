import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
    updatedAt: timestamp({ mode: "date" })
        .default(sql`(CURRENT_TIMESTAMP)`)
        .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
};
