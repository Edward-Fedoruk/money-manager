import { eq, between, and } from "drizzle-orm";
import { Transactions } from "../../db/schema";
import { DrizzleDatabase } from "../../ui/service-worker/init";
import {
    ITransactionRepository,
    RepositoryError,
    SaveTransactionRequestModel,
    TransactionOperationModel,
    UpdateTransactionRequestModel,
    UpdateTransactionResponseModel,
} from "../core/use-cases/transaction-repository.interface";
import { Categories } from "../../db/tables/categories";
import { SubCategories } from "../../db/tables/sub-category";
import { Identifier } from "../../common/types";

export class TransactionRepository implements ITransactionRepository {
    constructor(private db: DrizzleDatabase) {}

    async getTransactionsByDateRange(
        startDate: Date,
        endDate: Date,
    ): Promise<TransactionOperationModel[]> {
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
                    id: category!.id,
                    name: category!.name,
                },
                subcategory: subCategories
                    ? {
                          id: subCategories.id,
                          name: subCategories.name,
                      }
                    : undefined,
            }),
        );
    }

    async updateTransaction(
        transaction: UpdateTransactionRequestModel,
        transactionId: Identifier,
    ): Promise<UpdateTransactionResponseModel> {
        const updatedTransactionRecord = await this.db.transaction(async (tx) => {
            let foundCategories:
                | undefined
                | {
                      Categories: typeof Categories.$inferSelect | null;
                      Sub_categories: typeof SubCategories.$inferSelect | null;
                  }[];

            if (transaction.category || transaction.subcategory) {
                const conditions = [];

                if (transaction.category)
                    conditions.push(eq(Categories.name, transaction.category.name));
                if (transaction.subcategory)
                    conditions.push(eq(SubCategories.name, transaction.subcategory.name));

                foundCategories = await tx
                    .select()
                    .from(Categories)
                    .leftJoin(SubCategories, eq(Categories.id, SubCategories.categoryId))
                    .where(and(...conditions));
            }

            const [updateResult] = await tx
                .update(Transactions)
                .set({
                    type: transaction.type,
                    price: `${transaction.price}`,
                    currency: transaction.currency,
                    categoryId: foundCategories?.[0].Categories?.id,
                    description: transaction.description,
                    subcategoryId: foundCategories?.[0].Sub_categories?.id,
                })
                .where(eq(Transactions.id, transactionId))
                .returning();

            return updateResult;
        });

        return {
            description: updatedTransactionRecord.description ?? undefined,
            currency: updatedTransactionRecord.currency,
            price: parseFloat(updatedTransactionRecord.price),
            type: updatedTransactionRecord.type,
            datetime: updatedTransactionRecord.createdAt,
            category: {
                name: transaction.category!.name,
            },
            subcategory: transaction.subcategory
                ? {
                      name: transaction.subcategory.name,
                  }
                : undefined,
        };
    }

    async deleteTransaction(transactionId: number): Promise<void> {
        this.db.delete(Transactions).where(eq(Transactions.id, transactionId));
    }

    async saveTransaction(transaction: SaveTransactionRequestModel): Promise<void> {
        const [{ transactionId }] = await this.db
            .insert(Transactions)
            .values({
                categoryId: transaction.category.id,
                currency: transaction.currency,
                price: transaction.price.toString(),
                type: transaction.type,
                description: transaction.description,
            })
            .returning({ transactionId: Transactions.id });

        if (!transactionId) {
            throw new RepositoryError("transaction was not saved");
        }
    }
}
