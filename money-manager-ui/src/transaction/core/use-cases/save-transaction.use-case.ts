import { IUseCase } from "../../../common/types";
import { Transaction } from "../entities/transaction.entity";
import { ITransactionPresenter } from "./transaction-presenter.interface";
import { ITransactionRepository, RepositoryError } from "./transaction-repository.interface";

type CreateTransactionRequestModel = {
    datetime: Date;
    category: {
        id: number;
        name: string;
    };
    subcategory?: {
        id: number;
        name: string;
    };
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
        const transaction: Transaction = {
            datetime: transactionRequestModel.datetime,
            subcategory: transactionRequestModel.subcategory,
            type: transactionRequestModel.type,
            description: transactionRequestModel.description,
            price: transactionRequestModel.price,
            currency: transactionRequestModel.currency,
            category: transactionRequestModel.category,
        };

        try {
            await this.repository.saveTransaction({
                ...transaction,
                subcategory: {
                    id: transactionRequestModel.subcategory?.id,
                    name: transaction?.subcategory?.name,
                },
                category: {
                    id: transactionRequestModel.category.id,
                    name: transactionRequestModel.category.name,
                },
            });

            transactionPresenter.present({
                ...transaction,
                category: transaction.category.name,
                subcategory: transaction.subcategory?.name,
            });
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                transactionPresenter.presentFailure(
                    {
                        ...transaction,
                        category: transaction.category.name,
                        subcategory: transaction.subcategory?.name,
                    },
                    "Unable to save transaction",
                );
            }
            transactionPresenter.presentFailure(
                {
                    ...transaction,
                    category: transaction.category.name,
                    subcategory: transaction.subcategory?.name,
                },
                "something when saving transaction unexpected happened",
            );
        }
    }
}
