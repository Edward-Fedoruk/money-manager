import { IReportPresenter } from "../../../common/entities/report-presenter.interface";
import { IUseCase } from "../../../common/types";
import {
    ITransactionRepository,
    RepositoryError,
} from "./transaction-repository.interface";

export class DeleteTransactionUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(transactionId: string, reportPresenter: IReportPresenter) {
        try {
            await this.repository.deleteTransaction(transactionId);

            reportPresenter.presentSuccess("transaction deleted successfully");
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                reportPresenter.presentFailuer("failed to deleted transaction");
            }
        }
    }
}
