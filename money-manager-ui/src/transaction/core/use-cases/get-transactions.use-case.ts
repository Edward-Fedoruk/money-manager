import { IReportPresenter } from "../../../common/entities/report-presenter.interface";
import { IUseCase } from "../../../common/types";
import { Transaction } from "../entities/transaction.entity";
import { IGetTransactionsByDateRangePresenter } from "../interfaces/get-transactions-presenter.interface";
import { ITransactionRepository } from "../interfaces/transaction-repository.interface";

type GetTransactionsByDateRangeRequestModel = {
    startDate: Date;
    endDate: Date;
};

export class GetTransactionsByDateRangeUseCase implements IUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(
        transactionRequest: GetTransactionsByDateRangeRequestModel,
        simpleStatisticsPresenter: IGetTransactionsByDateRangePresenter,
        reportPresenter: IReportPresenter,
    ) {
        try {
            const transactions: Transaction[] = await this.repository.getTransactionsByDateRange(
                transactionRequest.startDate,
                transactionRequest.endDate,
            );

            const filterByType = (transactions: Transaction[], transType: Transaction["type"]) =>
                transactions.filter(({ type }) => type === transType);
            const sumTransactions = (transactions: Transaction[]) =>
                transactions.reduce((sum, t) => t.price + sum, 0);

            const incomeTransactions = filterByType(transactions, "income") as Array<
                Transaction & { type: "income" }
            >;
            const incomeSum = sumTransactions(incomeTransactions);

            const expenseTransactions = filterByType(transactions, "expense") as Array<
                Transaction & { type: "expense" }
            >;
            const expensesSum = sumTransactions(expenseTransactions);

            const total = incomeSum - expensesSum;

            simpleStatisticsPresenter.present({
                total,
                expenses: expensesSum,
                income: incomeSum,
                expenseTransactions,
                incomeTransactions,
            });
        } catch (error: unknown) {
            reportPresenter.presentFailuer("failed to calculate statistics");
        }
    }
}
