import { Dispatcher } from "app-core/universal";
import {
    IGetTransactionsByDateRangePresenter,
    GetByDateRangePresenterRequestModel,
} from "app-core/transaction";

type Transaction = {
    datetime: Date;
    category: string;
    id: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
};

export type TransactionsViewModel = {
    transactions?: {
        income: Array<Transaction & { type: "income" }>;
        expense: Array<Transaction & { type: "expense" }>;
    };
    calculations?: {
        income: number;
        expenses: number;
        total: number;
    };
};

export class GetTransactionsPresenter implements IGetTransactionsByDateRangePresenter {
    viewModel: TransactionsViewModel = {};

    constructor(private dispatch: Dispatcher<TransactionsViewModel>) { }

    present(simpleStatistics: GetByDateRangePresenterRequestModel): void {
        this.viewModel.calculations = simpleStatistics;
        this.dispatch(this.viewModel);
    }
}
