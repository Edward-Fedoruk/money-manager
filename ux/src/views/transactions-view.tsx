import { AddButton } from "../components/add-button";
import { DayTransactionsList } from "../components/day-transactions-list";
import { TimeNavigation } from "../components/time-navigation";
import { TransactionsTotal } from "../components/transactions-total";
import { Transaction } from "../types/transaction";

export const TransactionsView = () => {
    const transactions: Record<string, Transaction[]> = {
        "2024-10-25": [
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 134,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 434,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
        ],
        "2024-09-28": [
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 234,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 134,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 434,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
        ],
        "2024-09-25": [
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 234,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 134,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
            {
                id: 1,
                date: new Date(),
                category: { name: "Food", id: 1 },
                subCategory: { name: "supermarket", id: 1 },
                money: 434,
                currencySymbol: "$",
                note: "Sim 23. Groceries",
            },
        ],
    };
    return (
        <>
            <AddButton />
            <div className="relative pb-28">
                <TimeNavigation date={new Date()} />
                <TransactionsTotal expenses="210" income="122" total="44" />
                {Object.entries(transactions).map(([date, transactions], i) => {
                    return (
                        <DayTransactionsList
                            key={date.toString()}
                            className={i === 0 ? "mt-0 border-t-0" : ""}
                            date={date}
                            transactions={transactions}
                        />
                    );
                })}
            </div>
        </>
    );
};
