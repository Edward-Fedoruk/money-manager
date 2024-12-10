import { PlusIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

export const AddButton = () => {
    return (
        <Link
            className="fixed z-10 right-4 bottom-20 flex size-14 rounded-full bg-neutral-300 justify-center items-center"
            to="/new-transaction"
        >
            <PlusIcon className="size-8 text-neutral-950" />
        </Link>
    );
};
