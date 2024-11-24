export type TransactionPresenterRequestModel = {
    datetime: Date;
    category: string;
    subcategory?: string;
    description?: string;
    price: number;
    currency: string;
};

export interface ITransactionPresenter {
    present(transaction: TransactionPresenterRequestModel): void;
    presentFailure(transaction: Omit<TransactionPresenterRequestModel, "id">, error: string): void;
}
