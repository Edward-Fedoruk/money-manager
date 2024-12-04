import { IReportPresenter, IUseCase, RepositoryError } from "../../common";
import { Transaction } from "../entities/transaction.entity";
import { ITransactionPresenter } from "../interfaces/transaction-presenter.interface";
import { ITransactionRepository } from "../interfaces/transaction-repository.interface";

export class UpdateTransactionUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(
        transactionRequest: Partial<Transaction>,
        ids: {
            transactionId: number;
            categoryId?: number;
            subCategoryId?: number;
        },
        transactionPresenter: ITransactionPresenter,
        reportPresenter: IReportPresenter,
    ) {
        try {
            const transactionResult = await this.repository.updateTransaction({
                transaction: transactionRequest,
                metadata: {
                    transactionId: ids.transactionId,
                    subCategoryId: ids.subCategoryId,
                    categoryId: ids.categoryId,
                },
            });

            reportPresenter.presentSuccess("transaction updated successfully");

            transactionPresenter.present({
                id: ids.transactionId,
                datetime: transactionResult.datetime,
                currency: transactionResult.currency,
                price: transactionResult.price,
                category: transactionResult.category.name,
                subcategory: transactionResult.category.subCategory?.name,
                description: transactionResult.description,
            });
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                reportPresenter.presentFailuer("failed to update transaction");
            }
        }
    }
}
