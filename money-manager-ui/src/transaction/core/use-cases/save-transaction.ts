import { IUseCase } from "../../../common/types";
import { Transaction } from "../entities/transaction.entity";
import { ITransactionPresenter } from "./transaction-presenter.interface";
import {
    ITransactionRepository,
    RepositoryError,
} from "./transaction-repository.interface";

type CreateTransactionRequestModel = {
    datetime: Date;
    category: string;
    subcategory: string;
    description: string;
    price: number;
    currency: string;
};

export class SaveTransactionUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(
        transactionRequestModel: CreateTransactionRequestModel,
        transactionPresenter: ITransactionPresenter,
    ) {
        try {
            const transactionWithoutId: Omit<Transaction, "id"> = {
                datetime: transactionRequestModel.datetime,
                subcategory: transactionRequestModel.subcategory,
                description: transactionRequestModel.description,
                price: transactionRequestModel.price,
                currency: transactionRequestModel.currency,
                category: transactionRequestModel.category,
            };

            const transactionId =
                await this.repository.saveTransaction(transactionWithoutId);

            transactionPresenter.presentSavedTransaction({
                ...transactionWithoutId,
                id: transactionId,
            });
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                transactionPresenter.presentTransactionFailure(
                    {
                        datetime: transactionRequestModel.datetime,
                        subcategory: transactionRequestModel.subcategory,
                        description: transactionRequestModel.description,
                        price: transactionRequestModel.price,
                        currency: transactionRequestModel.currency,
                        category: transactionRequestModel.category,
                    },
                    "Unable to save transaction",
                );
            }
        }
    }
}
