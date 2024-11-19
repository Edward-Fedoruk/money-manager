export type TransactionOperationModel = {
    datetime: Date;
    category: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
    id: string;
    type: "income" | "expense";
};

type SaveTransactionResponseModel = TransactionOperationModel["id"];

export type UpdateTransactionResponseModel = TransactionOperationModel;

export type UpdateTransactionRequestModel =
    Partial<TransactionOperationModel> & { id: string };

export type SaveTransactionRequestModel = Omit<TransactionOperationModel, "id">;

export interface ITransactionRepository {
    saveTransaction(
        transaction: SaveTransactionRequestModel,
    ): Promise<SaveTransactionResponseModel>;

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
