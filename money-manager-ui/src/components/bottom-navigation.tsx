import {
    ClipboardDocumentListIcon,
    ChartBarIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactElement, useState } from "react";

type Buttons = "transactions" | "analytics" | "settings";

export const TabNavigation: FC<{ className?: string }> = ({ className }) => {
    const [activeButton, setActiveButton] = useState<Buttons>("transactions");

    const buttons: {
        name: string;
        type: Buttons;
        icon: ({ className }: { className: string }) => ReactElement;
    }[] = [
        {
            name: "transact.",
            type: "transactions",
            icon: ({ className }) => (
                <ClipboardDocumentListIcon className={className} />
            ),
        },
        {
            name: "analytics",
            type: "analytics",
            icon: ({ className }) => <ChartBarIcon className={className} />,
        },
        {
            name: "settings",
            type: "settings",
            icon: ({ className }) => <Cog6ToothIcon className={className} />,
        },
    ];

    return (
        <nav
            className={`flex border-t border-t-neutral-700 justify-around items-center ${className} h-16`}
        >
            {buttons.map(({ name, icon, type }) => (
                <a
                    onClick={() => setActiveButton(type)}
                    className="flex justify-center flex-col items-center dark:text-neutral-500 text-xs content-center cursor-pointer flex-wrap h-full"
                >
                    {icon({
                        className: `h-7 w-7  ${activeButton === type ? "text-neutral-200" : "dark:text-neutral-500"}`,
                    })}

                    <span
                        className={
                            activeButton === type
                                ? "text-neutral-200"
                                : "dark:text-neutral-500"
                        }
                    >
                        {name}
                    </span>
                </a>
            ))}
        </nav>
    );
};
