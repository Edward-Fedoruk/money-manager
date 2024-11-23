export type CategoryEntity = {
    name: string;
};

export class Category {
    name: string;

    constructor(category: CategoryEntity) {
        this.name = category.name;
    }
}
