import { FC } from "react";
import { SummaryListItem } from "./summary-list-item";
import { TransactionListItem } from "./transaction-list-item";
import { Transaction } from "../types/transaction";

type Props = {
    date: string;
    transactions: Transaction[];
    className: string;
};

export const DayTransactionsList: FC<Props> = ({ date, transactions, className }) => {
    const currencySymbol =
        transactions.find(({ currencySymbol }) => currencySymbol)?.currencySymbol ?? "$";

    const moneySpentPerDay = transactions
        .map(({ money }) => money)
        .reduce((acc, money) => acc + money, 0);

    return (
        <ul className={`my-2 border-y border-neutral-700 ${className}`}>
            <SummaryListItem
                moneySpent={`${currencySymbol} ${moneySpentPerDay}`}
                date={new Date(date)}
            />
            {transactions.map(({ note, currencySymbol, subCategory, category, money }) => (
                <TransactionListItem
                    key={note + money + category}
                    isSelected={false}
                    note={note}
                    subCategory={subCategory.name}
                    category={category.name}
                    money={`${currencySymbol} ${money}`}
                />
            ))}
        </ul>
    );
};
