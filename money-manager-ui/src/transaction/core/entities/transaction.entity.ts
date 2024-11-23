import { CategoryEntity } from "../../../categories/core/entities/category.entity";

type TransactionEntity = {
    datetime: Date;
    category: CategoryEntity;
    subcategory?: CategoryEntity;
    description: string;
    price: number;
    currency: string;
    type: "expense" | "income";
};

export class Transaction {
    datetime: Date;
    category: CategoryEntity;
    description: string;
    price: number;
    currency: string;
    subcategory?: CategoryEntity;
    type: "expense" | "income";

    constructor(transaction: TransactionEntity) {
        this.datetime = transaction.datetime;
        this.currency = transaction.currency;
        this.description = transaction.description;
        this.category = transaction.category;
        this.price = transaction.price;
        this.subcategory = transaction.subcategory;
        this.type = transaction.type;
    }
}
