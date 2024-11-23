import { Transactions } from "../../db/schema";
import { DrizzleDatabase } from "../../ui/service-worker/init";
import {
    ITransactionRepository,
    RepositoryError,
    SaveTransactionRequestModel,
    TransactionOperationModel,
    UpdateTransactionRequestModel,
    UpdateTransactionResponseModel,
} from "../core/use-cases/transaction-repository.interface";

export class TransactionRepository implements ITransactionRepository {
    constructor(private db: DrizzleDatabase) {}

    async getTransactionsByDateRange(
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

    async saveTransaction(transaction: SaveTransactionRequestModel): Promise<void> {
        const [{ transactionId }] = await this.db
            .insert(Transactions)
            .values({
                categoryId: transaction.category.id,
                currency: transaction.currency,
                price: transaction.price.toString(),
                type: transaction.type,
                description: transaction.description,
            })
            .returning({ transactionId: Transactions.id });

        if (!transactionId) {
            throw new RepositoryError("transaction was not saved");
        }
    }
}
