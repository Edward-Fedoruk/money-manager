export type Transaction = {
    id: number;
    date: Date;
    category: {
        id: number;
        name: string;
    };
    subCategory: {
        id: number;
        name: string;
    };
    money: number;
    currencySymbol: string;
    note: string;
};
