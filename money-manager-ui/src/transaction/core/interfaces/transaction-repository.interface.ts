import { TransactionEntity } from "../entities/transaction.entity";

export type UpdateTransactionResponseModel = TransactionEntity;

export type UpdateTransactionRequestModel = {
    transaction: Partial<TransactionEntity>;
    metadata: {
        categoryId?: number;
        subCategoryId?: number;
        transactionId: number;
    };
};

export type DeleteTransactionRequestModel = {
    transaction: TransactionEntity;
    metadata: {
        transactionId: number;
    };
};

export type SaveTransactionRequestModel = {
    transaction: TransactionEntity;
    metadata: {
        categoryId: number;
        subCategoryId?: number;
    };
};

export type GetTransactionByDateRangeResponseModel = TransactionEntity;

export interface ITransactionRepository {
    saveTransaction(requestModel: SaveTransactionRequestModel): Promise<number>;

    deleteTransaction(requestModel: DeleteTransactionRequestModel): Promise<void>;

    getTransactionsByDateRange(startDate: Date, endDate: Date): Promise<TransactionEntity[]>;

    updateTransaction(
        requestModel: UpdateTransactionRequestModel,
    ): Promise<UpdateTransactionResponseModel>;
}
