import { ICategoryRepository } from "../../categories";
import { Category } from "../../categories/entities/category.entity";
import { RepositoryError } from "../../common";
import { IUseCase } from "../../common/types";
import { Transaction } from "../entities/transaction.entity";
import { ITransactionPresenter } from "../interfaces/transaction-presenter.interface";
import { ITransactionRepository } from "../interfaces/transaction-repository.interface";

type CreateTransactionRequestModel = {
    datetime: Date;
    category: {
        name: string;
        id: number;
    };
    subcategory?: {
        name: string;
        id: number;
    };
    type: "income" | "expense";
    description: string;
    price: number;
    currency: string;
};

export class SaveTransactionUseCase implements IUseCase {
    constructor(
        private transactionRepository: ITransactionRepository,
        private categoryRepository: ICategoryRepository,
    ) {}

    async execute(requestModel: CreateTransactionRequestModel, presenter: ITransactionPresenter) {
        const transaction: Transaction = new Transaction({
            datetime: requestModel.datetime,
            type: requestModel.type,
            description: requestModel.description,
            price: requestModel.price,
            currency: requestModel.currency,
            category: new Category({
                name: requestModel.category.name,
                subCategory: requestModel.subcategory,
            }),
        });

        try {
            const categoryFindResult = await this.categoryRepository.findCategory(
                { category: transaction.category }
            );

            if (!categoryFindResult) {
                presenter.presentFailure(
                    {
                        ...transaction,
                        category: transaction.category.name,
                        subcategory: transaction.category.subCategories?.[0]?.name,
                    },
                    "category does not exits",
                );
                return;
            }

            if (requestModel.subcategory?.name) {
                const isSubCategoryExist = categoryFindResult.category?.subCategories
                    ?.map((sc) => sc.name)
                    .includes(requestModel.subcategory.name);

                if (!isSubCategoryExist) {
                    presenter.presentFailure(
                        {
                            ...transaction,
                            category: transaction.category.name,
                            subcategory: transaction.category.subCategories?.[0]?.name,
                        },
                        "category does not exits",
                    );
                    return;
                }
            }

            const transactionId = await this.transactionRepository.saveTransaction({
                transaction,
                metadata: {
                    categoryId: requestModel.category.id,
                    subCategoryId: requestModel.subcategory?.id,
                },
            });

            presenter.present({
                ...transaction,
                id: transactionId,
                category: transaction.category.name,
                subcategory: transaction.category?.subCategories?.[0]?.name,
            });
        } catch (error: unknown) {
            if (error instanceof RepositoryError) {
                presenter.presentFailure(
                    {
                        ...transaction,
                        category: transaction.category.name,
                        subcategory: requestModel.subcategory?.name,
                    },
                    "Unable to save transaction",
                );
            }
            presenter.presentFailure(
                {
                    ...transaction,
                    category: transaction.category.name,
                    subcategory: requestModel.subcategory?.name,
                },
                "something when saving transaction unexpected happened",
            );
        }
    }
}
