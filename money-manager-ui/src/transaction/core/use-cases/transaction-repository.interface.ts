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
    description: string;
    price: number;
    currency: string;
    id: number;
    type: "income" | "expense";
};

export type UpdateTransactionResponseModel = TransactionOperationModel;

export type UpdateTransactionRequestModel = Partial<TransactionOperationModel> & { id: string };

export type SaveTransactionRequestModel = Omit<TransactionOperationModel, "id">;

export interface ITransactionRepository {
    saveTransaction(transaction: SaveTransactionRequestModel): Promise<void>;

    deleteTransaction(transactionId: string): Promise<void>;

    getTransactionsByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<TransactionOperationModel[]>;

    updateTransaction(
        transaction: UpdateTransactionRequestModel,
    ): Promise<UpdateTransactionResponseModel>;
}

export class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}
