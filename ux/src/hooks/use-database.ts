import { useContext } from "react";
import { PGliteDatabaseContext } from "../context/pglite-database";

export const useDatabase = () => {
    const database = useContext(PGliteDatabaseContext);

    if (!database) {
        throw new Error("Failed to load user data");
    }

    return database;
};
