import { PlusIcon } from "@heroicons/react/16/solid";

export const AddButton = () => {
    return (
        <button
            className="fixed right-4 bottom-20 flex size-14 rounded-full bg-neutral-300 justify-center items-center"
            aria-label="add transaction"
        >
            <PlusIcon className="size-8 text-neutral-950" />
        </button>
    );
};
