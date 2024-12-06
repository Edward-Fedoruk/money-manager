import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { DrizzleDatabase, initDbWorker } from "../service-worker/init";

export const PGliteDatabaseContext = createContext<DrizzleDatabase | null>(null);

const initDb = initDbWorker();

export const PGliteDatabaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<null | DrizzleDatabase>(null);

    useEffect(() => {
        initDb.then(setState);
    }, []);

    return state === null ? (
        <div>Loading ...</div>
    ) : (
        <PGliteDatabaseContext.Provider value={state}>{children}</PGliteDatabaseContext.Provider>
    );
};
