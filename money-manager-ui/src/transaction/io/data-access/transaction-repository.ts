import {
    ITransactionRepository,
    SaveTransactionRequestModel,
} from "../../use-cases/transaction-repository.interface";

export class TransactionRepository implements ITransactionRepository {
    async saveTransaction(
        transaction: SaveTransactionRequestModel,
    ): Promise<string> {
        console.log("saving transaction", transaction);
        return "mocked-id-" + Math.random();
    }
}
