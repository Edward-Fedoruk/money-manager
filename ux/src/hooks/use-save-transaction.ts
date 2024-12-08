import { TransactionRepository } from "../adapters/transaction/transaction-repository";
import {
    TransactionPresenter,
    TransactionViewModel,
} from "../adapters/transaction/presenters/transaction.presenter";
import { SaveTransactionUseCase } from "app-core/transaction";
import { Transaction } from "../types/transaction";
import { create } from "zustand";
import { CategoryRepository } from "../adapters/categories/categories-repository";
import { useDatabase } from "./use-database";

const useSaveTransactionStore = create<TransactionViewModel>(() => ({}));

const saveTransactionPresenter = new TransactionPresenter((viewModel) =>
    useSaveTransactionStore.setState(viewModel ?? {}),
);

export const useSaveTransaction = () => {
    const database = useDatabase();
    const transactionUseCase = new SaveTransactionUseCase(
        new TransactionRepository(database),
        new CategoryRepository(),
    );

    const saveTransaction = (transaction: Transaction) => {
        transactionUseCase.execute(
            {
                type: transaction.money > 0 ? "income" : "expense",
                currency: transaction.currencySymbol,
                category: {
                    name: transaction.category.name,
                    id: transaction.category.id,
                },
                price: transaction.money,
                datetime: transaction.date,
                description: transaction.note,
                subcategory: {
                    name: transaction.subCategory.name,
                    id: transaction.subCategory.id,
                },
            },
            saveTransactionPresenter,
        );
    };

    const store = useSaveTransactionStore();

    return [store, saveTransaction] as [TransactionViewModel, typeof saveTransaction];
};
