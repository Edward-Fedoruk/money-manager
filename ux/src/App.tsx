import { AddButton } from "./components/add-button";
import { TabNavigation } from "./components/bottom-navigation";
import { TransactionsView } from "./components/transactions-view";

function App() {
    return (
        <>
            <TransactionsView />
            <AddButton />
            <TabNavigation className="fixed w-full bottom-0" />
        </>
    );
}

export default App;
