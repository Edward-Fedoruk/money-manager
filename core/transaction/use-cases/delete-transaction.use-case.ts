import { RepositoryError, IUseCase, IReportPresenter } from "../../common";
import { ITransactionRepository } from "../interfaces/transaction-repository.interface";

export class DeleteTransactionUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) { }

    async execute(transactionId: number, reportPresenter: IReportPresenter) {
        try {
            await this.repository.deleteTransaction({ transactionId });

            reportPresenter.presentSuccess("transaction deleted successfully");
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                reportPresenter.presentFailuer("failed to deleted transaction");
            }
        }
    }
}
