import { FC } from "react";

type Props = {
    total: string;
    expenses: string;
    income: string;
};

const columnClass = "flex flex-col items-center";
export const TransactionsTotal: FC<Props> = ({ total, expenses, income }) => {
    return (
        <div className="border-b py-1 border-b-neutral-700 bg-neutral-900 sticky text-xs text-neutral-200 top-0 flex justify-around">
            <span className={columnClass}>
                Income
                <span className="text-base">{income}</span>
            </span>
            <span className={columnClass}>
                Expenses
                <span className="text-base">{expenses}</span>
            </span>
            <span className={columnClass}>
                Total
                <span className="text-base">{total}</span>
            </span>
        </div>
    );
};
