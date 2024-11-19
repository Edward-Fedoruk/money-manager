import {
    ITransactionRepository,
    SaveTransactionRequestModel,
    TransactionOperationModel,
    UpdateTransactionRequestModel,
    UpdateTransactionResponseModel,
} from "../core/use-cases/transaction-repository.interface";

export class TransactionRepository implements ITransactionRepository {
    getTransactionsByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<TransactionOperationModel[]> {
        throw new Error("Method not implemented." + startDate + endDate);
    }

    async updateTransaction(
        transaction: UpdateTransactionRequestModel,
    ): Promise<UpdateTransactionResponseModel> {
        throw new Error("Method not implemented." + transaction.id);
    }

    async deleteTransaction(transactionid: string): Promise<void> {
        throw new Error("Method not implemented." + transactionid);
    }

    async saveTransaction(
        transaction: SaveTransactionRequestModel,
    ): Promise<string> {
        transaction;

        return "mocked-id-" + Math.random();
    }
}
