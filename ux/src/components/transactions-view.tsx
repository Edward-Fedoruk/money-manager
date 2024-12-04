import { DayTransactionsList } from "./day-transactions-list";
import { TimeNavigation } from "./time-navigation";
import { TransactionsTotal } from "./transactions-total";

export const TransactionsView = () => {
    const transactions = {
        "2024-10-25": [
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 134,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 434,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
        ],
        "2024-09-28": [
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 234,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 134,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 434,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
        ],
        "2024-09-25": [
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 234,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 134,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
            {
                date: new Date(),
                category: "Food",
                subCategory: "supermarket",
                money: 434,
                moneySign: "$",
                note: "Sim 23. Groceries",
            },
        ],
    };
    return (
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
    );
};
