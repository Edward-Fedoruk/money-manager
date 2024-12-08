import { useState } from "react";
import { TransactionTypePicker } from "../components/transaction-type-picker";
import { CreateTransactionForm } from "../components/create-transaction-form";

export const AddTransactionView = () => {
    const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
    return (
        <div className="px-2">
            <TransactionTypePicker
                transactionType={transactionType}
                changeTransactionType={setTransactionType}
            />
            <CreateTransactionForm />
        </div>
    );
};
