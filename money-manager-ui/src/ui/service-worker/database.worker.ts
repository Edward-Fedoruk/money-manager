import { PGlite } from "@electric-sql/pglite";
import { OpfsAhpFS } from "@electric-sql/pglite/opfs-ahp";
import { worker } from "@electric-sql/pglite/worker";
import { drizzle } from "drizzle-orm/pglite";

worker({
    async init() {
        return new PGlite({
            fs: new OpfsAhpFS("opfs-ahp://my-test-db2"),
        });
    },
});
