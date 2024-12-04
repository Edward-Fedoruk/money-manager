import { IReportPresenter } from "../entities/report-presenter.interface";
import { Dispatcher } from "../types";

export class ReportPresenter implements IReportPresenter {
    viewModel: IReportPresenter["viewModel"] = {};

    constructor(private dispatch: Dispatcher<unknown, void>) {}

    presentFailuer(message?: string) {
        this.viewModel.success = undefined;
        this.viewModel.failure = message ?? "action was failed";

        this.dispatch(this.viewModel);
    }

    presentSuccess(message?: string) {
        this.viewModel.failure = undefined;
        this.viewModel.success = message ?? "action was successful";

        this.dispatch(this.viewModel);
    }
}
