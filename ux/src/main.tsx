import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PGliteDatabaseProvider } from "./context/pglite-database";
import { initCommonWorker } from "./service-worker/init";

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <PGliteDatabaseProvider>
            <App />
        </PGliteDatabaseProvider>
    </StrictMode>,
);

initCommonWorker();
