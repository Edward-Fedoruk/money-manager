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
    type: "income" | "expense";
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
        const transactionWithoutId: Omit<Transaction, "id"> = {
            datetime: transactionRequestModel.datetime,
            subcategory: transactionRequestModel.subcategory,
            type: transactionRequestModel.type,
            description: transactionRequestModel.description,
            price: transactionRequestModel.price,
            currency: transactionRequestModel.currency,
            category: transactionRequestModel.category,
        };

        try {
            const transactionId =
                await this.repository.saveTransaction(transactionWithoutId);

            transactionPresenter.present({
                ...transactionWithoutId,
                id: transactionId,
            });
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                transactionPresenter.presentFailure(
                    transactionWithoutId,
                    "Unable to save transaction",
                );
            }
            transactionPresenter.presentFailure(
                transactionWithoutId,
                "something when saving transaction unexpected happened",
            );
        }
    }
}
