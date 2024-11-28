import { eq, between, and } from "drizzle-orm";
import { Transactions } from "../../db/schema";
import { DrizzleDatabase } from "../../ui/service-worker/init";
import {
    DeleteTransactionRequestModel,
    GetTransactionByDateRangeResponseModel,
    ITransactionRepository,
    SaveTransactionRequestModel,
    UpdateTransactionRequestModel,
    UpdateTransactionResponseModel,
} from "../core/interfaces/transaction-repository.interface";
import { Categories } from "../../db/tables/categories";
import { SubCategories } from "../../db/tables/sub-category";
import { RepositoryError } from "../../common/errors/repository";

export class TransactionRepository implements ITransactionRepository {
    constructor(private db: DrizzleDatabase) {}

    async getTransactionsByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<GetTransactionByDateRangeResponseModel[]> {
        const result = await this.db
            .select()
            .from(Transactions)
            .leftJoin(Categories, eq(Categories.id, Transactions.categoryId))
            .leftJoin(SubCategories, eq(SubCategories.id, Transactions.subcategoryId))
            .where(and(between(Transactions.createdAt, startDate, endDate)));

        return result.map(
            ({
                Transactions: transaction,
                Categories: category,
                Sub_categories: subCategories,
            }) => ({
                id: transaction.id,
                type: transaction.type,
                datetime: transaction.createdAt,
                price: parseFloat(transaction.price),
                currency: transaction.currency,
                category: {
                    name: category!.name,
                    subCategory: subCategories?.name
                        ? {
                              name: subCategories?.name,
                          }
                        : undefined,
                },
            }),
        );
    }

    async updateTransaction({
        transaction,
        metadata,
    }: UpdateTransactionRequestModel): Promise<UpdateTransactionResponseModel> {
        const updateResult = await this.db.transaction(async (tx) => {
            await tx
                .update(Transactions)
                .set({
                    type: transaction.type,
                    price: `${transaction.price}`,
                    currency: transaction.currency,
                    categoryId: metadata.categoryId,
                    description: transaction.description,
                    subcategoryId: metadata.subCategoryId,
                })
                .where(eq(Transactions.id, metadata.transactionId))
                .returning();

            const [transactionsWithCateogries] = await tx
                .select()
                .from(Transactions)
                .leftJoin(Categories, eq(Categories.id, Transactions.categoryId))
                .leftJoin(SubCategories, eq(SubCategories.id, Transactions.subcategoryId))
                .where(eq(Transactions.id, metadata.transactionId));

            return transactionsWithCateogries;
        });

        return {
            description: updateResult.Transactions.description ?? undefined,
            currency: updateResult.Transactions.currency,
            price: parseFloat(updateResult.Transactions.price),
            type: updateResult.Transactions.type,
            datetime: updateResult.Transactions.createdAt,
            category: {
                name: updateResult.Categories!.name,
                subCategory: updateResult.Sub_categories?.name
                    ? {
                          name: updateResult.Sub_categories?.name,
                      }
                    : undefined,
            },
        };
    }

    async deleteTransaction({ metadate }: DeleteTransactionRequestModel): Promise<void> {
        this.db.delete(Transactions).where(eq(Transactions.id, metadate.transactionId));
    }

    async saveTransaction({ transaction, metadate }: SaveTransactionRequestModel): Promise<number> {
        const [{ transactionId }] = await this.db
            .insert(Transactions)
            .values({
                categoryId: metadate.categoryId,
                subcategoryId: metadate.subCategoryId,
                currency: transaction.currency,
                price: transaction.price.toString(),
                type: transaction.type,
                description: transaction.description,
            })
            .returning({ transactionId: Transactions.id });

        if (!transactionId) {
            throw new RepositoryError("transaction was not saved");
        }

        return transactionId;
    }
}
