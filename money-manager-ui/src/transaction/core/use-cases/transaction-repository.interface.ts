import { Identifier } from "../../../common/types";
import { Transaction } from "../entities/transaction.entity";

export type TransactionOperationModel = {
    datetime: Date;
    category: {
        id: number;
        name: string;
    };
    subcategory?: {
        id?: number;
        name?: string;
    };
    description?: string;
    price: number;
    currency: string;
    id: number;
    type: "income" | "expense";
};

export type UpdateTransactionResponseModel = Transaction;

export type UpdateTransactionRequestModel = Partial<Transaction>;

export type SaveTransactionRequestModel = Omit<TransactionOperationModel, "id">;

export interface ITransactionRepository {
    saveTransaction(transaction: SaveTransactionRequestModel): Promise<void>;

    deleteTransaction(transactionId: TransactionOperationModel["id"]): Promise<void>;

    getTransactionsByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<TransactionOperationModel[]>;

    updateTransaction(
        transaction: UpdateTransactionRequestModel,
        transactionId: Identifier,
    ): Promise<UpdateTransactionResponseModel>;
}

export class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}
