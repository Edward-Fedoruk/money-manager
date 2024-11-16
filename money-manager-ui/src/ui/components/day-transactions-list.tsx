import { FC } from "react";
import { SummaryListItem } from "./summary-list-item";
import { TransactionListItem } from "./transaction-list-item";

export type TransactionItem = {
    date: Date;
    category: string;
    subCategory: string;
    money: number;
    moneySign: string;
    note: string;
};

type Props = {
    date: string;
    transactions: TransactionItem[];
    className: string;
};

export const DayTransactionsList: FC<Props> = ({
    date,
    transactions,
    className,
}) => {
    const moneySign =
        transactions.find(({ moneySign }) => moneySign)?.moneySign ?? "$";

    const moneySpentPerDay = transactions
        .map(({ money }) => money)
        .reduce((acc, money) => acc + money, 0);

    return (
        <ul className={`my-2 border-y border-neutral-700 ${className}`}>
            <SummaryListItem
                moneySpent={`${moneySign} ${moneySpentPerDay}`}
                date={new Date(date)}
            />
            {transactions.map(
                ({ note, moneySign, subCategory, category, money }) => (
                    <TransactionListItem
                        key={note + money + category}
                        isSelected={false}
                        note={note}
                        subCategory={subCategory}
                        category={category}
                        money={`${moneySign} ${money}`}
                    />
                ),
            )}
        </ul>
    );
};
