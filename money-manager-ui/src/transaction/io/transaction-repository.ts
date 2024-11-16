import {
    ITransactionRepository,
    SaveTransactionRequestModel,
} from "../core/use-cases/transaction-repository.interface";

interface ITransactionRepository {}

export class TransactionRepository implements ITransactionRepository {
    async saveTransaction(
        transaction: SaveTransactionRequestModel,
    ): Promise<string> {
        transaction;

        return "mocked-id-" + Math.random();
    }
}
