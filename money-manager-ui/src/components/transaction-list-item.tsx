import { FC } from "react";

type Props = {
    isSelected: boolean;
    note: string;
    money: string;
    category: string;
    subCategory: string;
};

export const TransactionListItem: FC<Props> = ({
    category,
    subCategory,
    isSelected,
    note,
    money,
}) => {
    return (
        <li
            className={`${isSelected ? "" : ""} px-4 py-2 flex bg-neutral-900 justify-start items-center dark:text-neutral-500`}
        >
            <span className="w-20 flex flex-col justify-start">
                <span className="trancate text-sm">{category}</span>
                {subCategory && (
                    <span className="text-xs trancate overflow-hidden text-ellipsis">
                        {subCategory}
                    </span>
                )}
            </span>
            <span className="trancate ml-4 flex-grow text-base dark:text-neutral-200">
                {note}
            </span>
            <span className="ml-4">{money}</span>
        </li>
    );
};
