import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
    date: Date | string;
};

export const TimeNavigation: FC<Props> = ({ date }) => {
    const formattedDate = new Date(date).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
    });

    return (
        <div className="flex justify-start py-5 text-neutral-200 border-b border-b-neutral-700 bg-neutral-900">
            <div className="flex items-center justify-start">
                <ChevronLeftIcon className="w-5" />
                <span className="w-24 text-center text-sm">
                    {formattedDate}
                </span>
                <ChevronRightIcon className="w-5" />
            </div>
        </div>
    );
};
