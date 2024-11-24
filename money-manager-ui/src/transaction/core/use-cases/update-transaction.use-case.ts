import { IReportPresenter } from "../../../common/entities/report-presenter.interface";
import { Identifier, IUseCase } from "../../../common/types";
import { Transaction } from "../entities/transaction.entity";
import { ITransactionPresenter } from "./transaction-presenter.interface";
import { ITransactionRepository, RepositoryError } from "./transaction-repository.interface";

export class UpdateTransactionUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(
        transactionRequest: Partial<Transaction>,
        transactionId: Identifier,
        transactionPresenter: ITransactionPresenter,
        reportPresenter: IReportPresenter,
    ) {
        try {
            const transactionResult = await this.repository.updateTransaction(
                transactionRequest,
                transactionId,
            );

            reportPresenter.presentSuccess("transaction updated successfully");

            transactionPresenter.present({
                datetime: transactionResult.datetime,
                currency: transactionResult.currency,
                price: transactionResult.price,
                category: transactionResult.category.name,
                subcategory: transactionResult.subcategory?.name,
                description: transactionResult.description,
            });
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                reportPresenter.presentFailuer("failed to update transaction");
            }
        }
    }
}
