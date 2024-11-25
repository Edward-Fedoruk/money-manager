import { PGlite } from "@electric-sql/pglite";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { drizzle, PgliteDatabase } from "drizzle-orm/pglite/driver";
import migrations from "../../db/migrations/migrations.json";
import { MigrationConfig } from "drizzle-orm/migrator";

export type DrizzleDatabase = PgliteDatabase<Record<string, never>> & {
    $client: PGlite & PGliteWorker;
};

export const initDbWorker = () =>
    new Promise<DrizzleDatabase>((resolve, reject) => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                try {
                    new Worker(new URL("./common.worker.ts", import.meta.url), {
                        type: "module",
                    });

                    const worker = new Worker(new URL("./database.worker.ts", import.meta.url), {
                        type: "module",
                    });

                    const pg = new PGliteWorker(worker) as PGlite & PGliteWorker;
                    await pg.waitReady;
                    const db = drizzle({ client: pg, casing: "snake_case" });

                    // @ts-ignore
                    await db.dialect.migrate(migrations, db.session, {
                        migrationsTable: "drizzle_migrations",
                    } satisfies Omit<MigrationConfig, "migrationsFolder">);

                    if (import.meta.env.DEV) {
                        //@ts-ignore
                        window.db = pg;
                    }
                    resolve(db);
                } catch {
                    reject();
                }
            });
        } else {
            reject();
        }
    });

export const initCommonWorker = () => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            new Worker(new URL("./common.worker.ts", import.meta.url), {
                type: "module",
            });
        });
    }
};
