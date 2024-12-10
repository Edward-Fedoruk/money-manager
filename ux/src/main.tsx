import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PGliteDatabaseProvider } from "./context/pglite-database";
import { initCommonWorker } from "./service-worker/init";

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <PGliteDatabaseProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PGliteDatabaseProvider>
    </StrictMode>,
);

initCommonWorker();
