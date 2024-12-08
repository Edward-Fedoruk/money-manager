import { TabNavigation } from "./components/bottom-navigation";
import { AddTransactionView } from "./views/add-transaction-view";
// import { TransactionsView } from "./views/transactions-view";

function App() {
    return (
        <>
            <AddTransactionView />
            {/* <TransactionsView /> */}
            <TabNavigation className="fixed w-full bottom-0" />
        </>
    );
}

export default App;
