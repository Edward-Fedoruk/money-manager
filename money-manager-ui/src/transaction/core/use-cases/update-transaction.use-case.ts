import { IReportPresenter } from "../../../common/entities/report-presenter.interface";
import { IUseCase } from "../../../common/types";
import { Transaction } from "../entities/transaction.entity";
import { ITransactionPresenter } from "./transaction-presenter.interface";
import {
    ITransactionRepository,
    RepositoryError,
} from "./transaction-repository.interface";

type UpdateTransactionRequestModel = {
    datetime?: Date;
    category?: string;
    subcategory?: string;
    description?: string;
    price?: number;
    currency?: string;
    id: string;
};

export class UpdateTransactionUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(
        transactionRequest: UpdateTransactionRequestModel,
        transactionPresenter: ITransactionPresenter,
        reportPresenter: IReportPresenter,
    ) {
        try {
            const transactionResult: Transaction =
                await this.repository.updateTransaction(transactionRequest);

            reportPresenter.presentSuccess("transaction updated successfully");
            transactionPresenter.present(transactionResult);
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                reportPresenter.presentFailuer("failed to update transaction");
            }
        }
    }
}
