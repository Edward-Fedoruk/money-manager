type CategoryWithSubCategories = {
    subCategories?: Omit<CategoryEntity, "subCategories">[];
    subCategory?: never;
    name: string;
};

type CategoryWithOneSubCategory = {
    subCategories?: never;
    subCategory?: Omit<CategoryEntity, "subCategories">;
    name: string;
};

export type CategoryEntity = CategoryWithSubCategories | CategoryWithOneSubCategory;

export class Category {
    name: string;
    subCategories?: Omit<CategoryEntity, "subCategories">[];
    subCategory?: Omit<CategoryEntity, "subCategories">;

    constructor(category: CategoryEntity) {
        this.name = category.name;
        this.subCategory = category.subCategory;
        this.subCategories = category.subCategories;
    }
}
