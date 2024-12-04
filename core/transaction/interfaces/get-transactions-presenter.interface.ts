import { Transaction } from "../entities/transaction.entity";

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
