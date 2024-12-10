import {
    ClipboardDocumentListIcon,
    ChartBarIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactElement, useState } from "react";
import { NavLink } from "react-router";

type Buttons = "transactions" | "analytics" | "settings";

export const BottomTabNavigation: FC<{ className?: string }> = ({ className }) => {
    const buttons: {
        name: string;
        type: Buttons;
        path: string;
        icon: ({ className }: { className: string }) => ReactElement;
    }[] = [
        {
            name: "transact.",
            type: "transactions",
            path: "/",
            icon: ({ className }) => <ClipboardDocumentListIcon className={className} />,
        },
        {
            name: "analytics",
            type: "analytics",
            path: "/analytics",
            icon: ({ className }) => <ChartBarIcon className={className} />,
        },
        {
            name: "settings",
            path: "settings",
            type: "settings",
            icon: ({ className }) => <Cog6ToothIcon className={className} />,
        },
    ];

    return (
        <nav
            className={`flex border-t border-t-neutral-700 justify-around items-center bg-neutral-900 ${className} h-16 fixed bottom-0 w-full`}
        >
            {buttons.map(({ name, path, icon, type }) => (
                <NavLink
                    onClick={() => setActiveButton(type)}
                    key={name}
                    to={path}
                    className={
                        "flex justify-center flex-col items-center dark:text-neutral-500 text-xs content-center cursor-pointer flex-wrap h-full"
                    }
                >
                    {({ isActive }) => (
                        <>
                            {icon({
                                className: `size-7  ${isActive ? "text-neutral-200" : "dark:text-neutral-500"}`,
                            })}

                            <span
                                className={isActive ? "text-neutral-200" : "dark:text-neutral-500"}
                            >
                                {name}
                            </span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};
