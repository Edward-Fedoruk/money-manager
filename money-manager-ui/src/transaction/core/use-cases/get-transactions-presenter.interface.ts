type Transaction = {
    datetime: Date;
    category: string;
    id: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
};

export type GetByDateRangePresenterRequestModel = {
    income: number;
    expenses: number;
    total: number;
    expenseTransactions: Array<Transaction & { type: "expense" }>;
    incomeTransactions: Array<Transaction & { type: "income" }>;
};

export interface IGetTransactionsByDateRangePresenter {
    present(simpleStatistics: GetByDateRangePresenterRequestModel): void;
}
