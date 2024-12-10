import { Outlet } from "react-router";
import { BottomTabNavigation } from "./bottom-navigation";

export const MainLayout = () => {
    return (
        <div className="bg-neutral-50 dark:bg-neutral-800 h-full">
            <Outlet />
            <BottomTabNavigation />
        </div>
    );
};
