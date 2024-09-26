import { FC } from "react";

type Props = {
    date: Date;
    moneySpent: string;
};

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const SummaryListItem: FC<Props> = ({ date, moneySpent }) => {
    const dayOfWeek = daysOfWeek[date.getDay()];

    const dayOfMonthString = date.getDate().toString().padStart(2, "0");

    return (
        <li className="flex justify-between px-4 py-2 border-b border-b-neutral-700 bg-neutral-900">
            <span className="flex items-center">
                <span className="font-bold dark:text-neutral-200 text-lg">
                    {dayOfMonthString}
                </span>
                <span className="text-xs p-0.5 bg-neutral-500 rounded dark:text-neutral-200 ml-1">
                    {dayOfWeek}
                </span>
            </span>
            <span className="dark:text-neutral-500">{moneySpent}</span>
        </li>
    );
};
