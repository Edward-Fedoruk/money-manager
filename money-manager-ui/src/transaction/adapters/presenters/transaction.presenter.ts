import { Dispatcher } from "../../../common/types";
import {
    ITransactionPresenter,
    TransactionPresenterRequestModel,
} from "../../core/use-cases/transaction-presenter.interface";

export type TransactionViewModel = {
    errorMessage?: string;
    transaction?: {
        date: Date;
        category: string;
        subCategory?: string;
        price: number;
        id: string;
        formattedDate: {
            dayOfMonth: string;
            dayOfWeek: string;
        };
        currency: string;
        displayPrice: string;
        note: string;
    };
};

export class TransactionPresenter implements ITransactionPresenter {
    viewModel: TransactionViewModel = {};
    constructor(private dispatch: Dispatcher<TransactionViewModel>) {}

    present(transaction: TransactionPresenterRequestModel): void {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const date = new Date(transaction.datetime);

        const dayOfWeek = daysOfWeek[date.getDay()];

        const dayOfMonth = date.getDate().toString().padStart(2, "0");

        this.viewModel.transaction = {
            id: transaction.id,
            displayPrice: `${transaction.currency} ${transaction.price}`,
            date: transaction.datetime,
            subCategory: transaction.subcategory,
            category: transaction.category,
            price: transaction.price,
            currency: transaction.currency,
            formattedDate: {
                dayOfMonth,
                dayOfWeek,
            },
            note: transaction.description,
        };

        this.dispatch(this.viewModel);
    }

    presentFailure(
        _: Omit<TransactionPresenterRequestModel, "id">,
        message: string,
    ): void {
        this.viewModel.errorMessage = `Error: ${message}`;

        this.dispatch(this.viewModel);
    }
}
