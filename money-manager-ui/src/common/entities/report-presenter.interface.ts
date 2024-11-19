export interface IReportPresenter {
    viewModel: { failure?: string; success?: string };

    presentSuccess(message?: string): void;
    presentFailuer(message?: string): void;
}
