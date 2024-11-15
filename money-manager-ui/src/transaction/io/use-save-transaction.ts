import { TransactionListItem } from "../../ui/components/transaction-list-item";
import { TransactionRepository } from "./data-access/transaction-repository";
import { SaveTransactionPresenter } from "../presenters/transaction.presenter";
import { SaveTransactionUseCase } from "../use-cases/save-transaction";

export const useSaveTransaction = () => {
    const transactionUsecase = new SaveTransactionUseCase(
        new TransactionRepository(),
    );

    const saveTransactionPresenter = new SaveTransactionPresenter(() => {});

    return {
        saveTransaction(transaction: TransactionListItem) {
            transactionUsecase.execute(
                {
                    ...transaction,
                },
                saveTransactionPresenter,
            );
        },
    };
};
