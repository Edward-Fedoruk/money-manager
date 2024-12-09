import { useState } from "react";
import { TransactionTypePicker } from "../components/transaction-type-picker";
import { CreateTransactionForm } from "../components/create-transaction-form";

export const AddTransactionView = () => {
    const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
    return (
        <div className="flex flex-col h-[calc(100%-64px)]">
            <TransactionTypePicker
                transactionType={transactionType}
                changeTransactionType={setTransactionType}
            />
            <CreateTransactionForm />
        </div>
    );
};
