import { Route, Routes } from "react-router";
import { AddTransactionView } from "./views/add-transaction-view";
import { TransactionsView } from "./views/transactions-view";
import { MainLayout } from "./components/main-layout";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<TransactionsView />} />
                <Route path="/new-transaction" element={<AddTransactionView />} />
            </Route>
        </Routes>
    );
}

export default App;
