import { TransactionRepository } from "../../transaction/io/transaction-repository";
import { SaveTransactionPresenter } from "../../transaction/adapters/presenters/transaction.presenter";
import { SaveTransactionUseCase } from "../../transaction/core/use-cases/save-transaction";
import { TransactionItem } from "../components/day-transactions-list";

export const useSaveTransaction = () => {
    const transactionUsecase = new SaveTransactionUseCase(
        new TransactionRepository(),
    );

    const saveTransactionPresenter = new SaveTransactionPresenter(
        (viewModel) => {
            viewModel?.transaction;
        },
    );

    return {
        saveTransaction(transaction: TransactionItem) {
            transactionUsecase.execute(
                {
                    currency: transaction.moneySign,
                    category: transaction.category,
                    price: transaction.money,
                    datetime: transaction.date,
                    description: transaction.note,
                    subcategory: transaction.subCategory,
                },
                saveTransactionPresenter,
            );
        },
    };
};
