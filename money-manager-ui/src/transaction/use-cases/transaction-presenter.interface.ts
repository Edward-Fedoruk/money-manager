export type TransactionPresenterRequestModel = {
    datetime: Date;
    category: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
    id: string;
};

export interface ITransactionPresenter {
    presentSavedTransaction(
        transaction: TransactionPresenterRequestModel,
    ): void;
    presentTransactionFailure(
        transaction: Omit<TransactionPresenterRequestModel, "id">,
        error: string,
    ): void;
}
