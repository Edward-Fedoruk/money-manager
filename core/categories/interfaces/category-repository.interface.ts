import { Category } from "../entities/category.entity";

export interface ICategoryRepository {
    findCategory(
        transaction: Category,
    ): Promise<{
        category: Category | null;
        metadata: { categoryId: number; subCategoryIds: number[] };
    }>;
}
