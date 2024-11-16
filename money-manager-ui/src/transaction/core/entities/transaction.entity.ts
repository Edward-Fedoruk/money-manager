type TransactionEntity = {
    datetime: Date;
    category: string;
    id: string;
    subcategory?: string;
    description: string;
    price: number;
    currency: string;
};

export class Transaction {
    public datetime: Date;
    public category: string;
    public description: string;
    public price: number;
    public currency: string;
    public id: string;
    public subcategory?: string;

    constructor(transaction: TransactionEntity) {
        this.datetime = transaction.datetime;
        this.currency = transaction.currency;
        this.description = transaction.description;
        this.id = transaction.id;
        this.category = transaction.category;
        this.price = transaction.price;
        this.subcategory = transaction.subcategory;
    }
}
