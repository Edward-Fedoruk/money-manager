import { AddButton } from "./ui/components/add-button";
import { TabNavigation } from "./ui/components/bottom-navigation";
import { TransactionsView } from "./ui/components/transactions-view";

function App() {
    return (
        <>
            testsd fds
            <TransactionsView />
            <AddButton />
            <TabNavigation className="fixed w-full bottom-0" />
        </>
    );
}

export default App;
