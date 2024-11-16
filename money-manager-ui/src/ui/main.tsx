import { StrictMode } from "react";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        const start = performance.now();

        new Worker(
            new URL("./service-worker/common.worker.ts", import.meta.url),
            {
                type: "module",
            },
        );

        const worker = new Worker(
            new URL("./service-worker/database.worker.ts", import.meta.url),
            {
                type: "module",
            },
        );

        const pg = new PGliteWorker(worker);
        pg.exec("SELECT 1").then((res) => console.log(res));
        console.log("Waiting for ready...");
        await pg.waitReady;

        console.log("Ready! Took", performance.now() - start, "ms");

        console.log("Creating table...");
        await pg.exec(`
            CREATE TABLE IF NOT EXISTS test (
            id SERIAL PRIMARY KEY,
            name TEXT
            );
        `);

        console.log("Inserting data...");
        await pg.exec("INSERT INTO test (name) VALUES ('test');");

        console.log("Selecting data...");
        const res = await pg.exec(`
            SELECT * FROM test;
        `);

        console.log(res);

        // Transaction example:
        console.log("Transaction example...");
        await pg.transaction(async (tx) => {
            await tx.exec("INSERT INTO test (name) VALUES ('test2');");
            await tx.exec("INSERT INTO test (name) VALUES ('test3');");
        });

        console.log("Selecting data...");
        const res2 = await pg.exec(`
            SELECT * FROM test;
        `);

        console.log(res2);
    });
}
