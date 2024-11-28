import { TransactionRepository } from "../../transaction/io/transaction-repository";
import {
    TransactionPresenter,
    TransactionViewModel,
} from "../../transaction/adapters/presenters/transaction.presenter";
import { SaveTransactionUseCase } from "../../transaction/core/use-cases/save-transaction.use-case";
import { TransactionItem } from "../components/day-transactions-list";
import { create } from "zustand";
import { useContext } from "react";
import { PGliteDatabaseContext } from "../context/pglite-database";

const useSaveTransactionStore = create<TransactionViewModel>(() => ({}));

const saveTransactionPresenter = new TransactionPresenter((viewModel) =>
    useSaveTransactionStore.setState(viewModel ?? {}),
);

export const useSaveTransaction = () => {
    const database = useContext(PGliteDatabaseContext);
    const transactionUseCase = new SaveTransactionUseCase(new TransactionRepository(database));

    const saveTransaction = (transaction: TransactionItem) => {
        transactionUseCase.execute(
            {
                type: transaction.money > 0 ? "income" : "expense",
                currency: transaction.moneySign,
                category: {
                    name: transaction.category,
                    id: transaction.category
                }
                price: transaction.money,
                datetime: transaction.date,
                description: transaction.note,
                subcategory: transaction.subCategory,
            },
            saveTransactionPresenter,
        );
    };

    const store = useSaveTransactionStore();

    return [store, saveTransaction] as [TransactionViewModel, typeof saveTransaction];
};
