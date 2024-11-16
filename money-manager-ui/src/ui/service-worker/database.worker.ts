import { PGlite } from "@electric-sql/pglite";
import { OpfsAhpFS } from "@electric-sql/pglite/opfs-ahp";
import { worker } from "@electric-sql/pglite/worker";

worker({
    async init() {
        return new PGlite({
            fs: new OpfsAhpFS("opfs-ahp://my-test-db2"),
        });
    },
});

// importScripts("./sqlite3.js");

// const log = console.log;
// const error = console.error;
//
// const start = function (sqlite3) {
//     navigator.storage.getDirectory().then(res => {
//         log('res', res)
//     })
//     log("Running SQLite3 version", sqlite3.version.libVersion,
//            globalThis.FileSystemFileHandle.prototype,
//            !navigator?.storage?.getDirectory);
//     let db;
//     // if ("opfs" in sqlite3) {
//         db = new sqlite3.oo1.OpfsDb("/mydb.sqlite3");
//         log("OPFS is available, created persisted database at", db.filename);
//     // } else {
//     //     db = new sqlite3.oo1.DB("/mydb.sqlite3", "ct");
//     //     log("OPFS is not available, created transient database", db.filename);
//     //     log("Creating a table...");
//     //     db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
//     //     log("Insert some data using exec()...");
//     //     for (let i = 20; i <= 25; ++i) {
//     //         db.exec({
//     //             sql: "INSERT INTO t(a,b) VALUES (?,?)",
//     //             bind: [i, i * 2],
//     //         });
//     //     }
//     //     log("Query data with exec()...");
//     //     db.exec({
//     //         sql: "SELECT a FROM t ORDER BY a LIMIT 3",
//     //         callback: (row) => {
//     //             log(row);
//     //         },
//     //     });
//     // }
// };
//
// // @ts-ignore
// sqlite3InitModule().then((sqlite3) => {
//     start(sqlite3)
//     console.log("sqlite3: test ");
// });
