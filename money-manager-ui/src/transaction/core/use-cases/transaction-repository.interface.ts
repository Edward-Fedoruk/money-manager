type SaveTransactionResponseModel = string;

export type SaveTransactionRequestModel = {
    datetime: Date;
    category: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
};

export interface ITransactionRepository {
    saveTransaction(
        transaction: SaveTransactionRequestModel,
    ): Promise<SaveTransactionResponseModel>;
}

export class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}
