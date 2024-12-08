import { Category } from "../entities/category.entity";

export type FindCategoryInput = {
    category: Category;
}
export type FindCategoryOutput = {
    category: Category | null;
    metadata: { categoryId: number; subCategoryIds: number[] };
}

export interface ICategoryRepository {
    findCategory(
        category: FindCategoryInput,
    ): Promise<FindCategoryOutput>;
}
