type TransactionEntity = {
    datetime: Date;
    category: string;
    id: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
    type: "expense" | "income";
};

export class Transaction {
    datetime: Date;
    category: string;
    description: string;
    price: number;
    currency: string;
    id: string;
    subcategory?: string;
    type: "expense" | "income";

    constructor(transaction: TransactionEntity) {
        this.datetime = transaction.datetime;
        this.currency = transaction.currency;
        this.description = transaction.description;
        this.id = transaction.id;
        this.category = transaction.category;
        this.price = transaction.price;
        this.subcategory = transaction.subcategory;
        this.type = transaction.type;
    }
}
