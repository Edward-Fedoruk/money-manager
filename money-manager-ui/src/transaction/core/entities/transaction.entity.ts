import { Category } from "../../../categories/core/entities/category.entity";

export type TransactionEntity = {
    datetime: Date;
    category: Category;
    description?: string;
    price: number;
    currency: string;
    type: "expense" | "income";
};

export class Transaction {
    datetime: Date;
    category: Category;
    description?: string;
    price: number;
    currency: string;
    type: "expense" | "income";

    constructor(transaction: TransactionEntity) {
        this.datetime = transaction.datetime;
        this.currency = transaction.currency;
        this.description = transaction.description;
        this.category = transaction.category;
        this.price = transaction.price;
        this.type = transaction.type;
    }
}
