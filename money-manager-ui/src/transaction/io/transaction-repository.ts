import {
    ITransactionRepository,
    SaveTransactionRequestModel,
} from "../core/use-cases/transaction-repository.interface";

export class TransactionRepository implements ITransactionRepository {
    async saveTransaction(
        transaction: SaveTransactionRequestModel,
    ): Promise<string> {
        transaction;

        return "mocked-id-" + Math.random();
    }
}
