import { FindCategoryInput, FindCategoryOutput, ICategoryRepository } from "app-core/categories";

export class CategoryRepository implements ICategoryRepository {
    findCategory(category: FindCategoryInput): Promise<FindCategoryOutput> {
        throw new Error("Method not implemented. " + category.category.name);
    }
}
