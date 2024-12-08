import { FC } from "react";

type Props = {
    transactionType: "EXPENSE" | "INCOME";
    changeTransactionType: (type: "EXPENSE" | "INCOME") => void;
};

export const TransactionTypePicker: FC<Props> = ({ changeTransactionType, transactionType }) => {
    const pickerButtonStyle =
        "border rounded-md flex-1 border-neutral-700 bg-neutral-900 px-2 py-1";
    const activeTransactionPickerStyle = "border-red-500 text-red-500";
    const activeIncomePickerStyle = "border-blue-500 text-blue-500";

    return (
        <div className="px-2 font-medium flex mt-5 items-stretch gap-2 text-neutral-500 text-sm">
            <button
                onClick={() => changeTransactionType("EXPENSE")}
                className={`${pickerButtonStyle} ${transactionType === "EXPENSE" ? activeTransactionPickerStyle : ""}`}
            >
                Expense
            </button>
            <button
                onClick={() => changeTransactionType("INCOME")}
                className={`${pickerButtonStyle} ${transactionType === "INCOME" ? activeIncomePickerStyle : ""}`}
            >
                Income
            </button>
        </div>
    );
};
