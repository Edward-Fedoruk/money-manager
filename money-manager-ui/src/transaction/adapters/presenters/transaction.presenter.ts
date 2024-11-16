import { Dispatcher } from "../../../common/types";
import {
    ITransactionPresenter,
    TransactionPresenterRequestModel,
} from "../../core/use-cases/transaction-presenter.interface";

type SaveTransactionViewModel = {
    errorMessage?: string;
    transaction?: {
        date: Date;
        category: string;
        subCategory?: string;
        money: number;
        moneySign: string;
        id: string;
        note: string;
    };
};

export class SaveTransactionPresenter implements ITransactionPresenter {
    viewModel: SaveTransactionViewModel = {};
    constructor(private dispatch: Dispatcher<SaveTransactionViewModel>) {}

    presentSavedTransaction(
        transaction: TransactionPresenterRequestModel,
    ): void {
        this.viewModel.transaction = {
            id: transaction.id,
            date: transaction.datetime,
            subCategory: transaction.subcategory,
            category: transaction.category,
            money: transaction.price,
            moneySign: transaction.currency,
            note: transaction.description,
        };

        this.dispatch(this.viewModel);
    }

    presentTransactionFailure(
        _: Omit<TransactionPresenterRequestModel, "id">,
        message: string,
    ): void {
        this.viewModel.errorMessage = `Error: ${message}. Please try to save transaction it again`;
    }
}
