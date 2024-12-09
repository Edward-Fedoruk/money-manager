import { ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export const CreateTransactionForm = () => {
    const { register, handleSubmit } = useForm();
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (data: any) => console.log(data);

    const switchToNextInput = (event: Event) => {
        const currentInput = event.target as HTMLInputElement;
        if (currentInput.nodeName !== "INPUT" && currentInput.nodeName !== "SELECT") return;

        if (!formRef.current) return;
        const formElement = formRef.current;

        const formInputs = Array.from(formElement).filter(
            (element) => element.nodeName === "INPUT" || "SELECT",
        ) as HTMLInputElement[];

        const nextInputIndex = formInputs.indexOf(currentInput) + 1;
        if (nextInputIndex > formInputs.length) return;

        const nextInput = formInputs[nextInputIndex];

        nextInput.focus();
        event.preventDefault();
    };

    const categoryFormRegister = register("category", { required: true });

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        categoryFormRegister.onChange(event);
        switchToNextInput(event.nativeEvent);
    };

    useEffect(() => {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.code === "Enter") {
                switchToNextInput(event);
            }
        });
    }, []);
    return (
        <form
            ref={formRef}
            className="flex-1 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="bg-neutral-900 px-2 pb-4 py-2 flex-1 rounded-b-md">
                <div className="h-7 flex items-center mt-0">
                    <label className="text-neutral-400 w-4/12 max-w-24" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        {...register("number", { required: true })}
                        type="number"
                        className="text-neutral-200 w-full h-full focus:outline-none bg-transparent border-b border-b-neutral-700 active:border-b-red-500 active:border-b focus:border-b-red-500 focus:border-b"
                    />
                </div>

                <div className="h-7 flex items-center mt-5">
                    <label className="text-neutral-400 w-4/12 max-w-24" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="text-neutral-200 focus:outline-none w-full h-full bg-transparent border-b border-b-neutral-700 active:border-b-red-500 active:border-b focus:border-b-red-500 focus:border-b"
                        {...categoryFormRegister}
                        onChange={handleCategoryChange}
                    >
                        <option value="test1">test1</option>
                        <option value="test2">test2</option>
                    </select>
                </div>
                <div className="h-7 flex items-center mt-5">
                    <label className="w-4/12 text-neutral-400 max-w-24" htmlFor="note">
                        Note
                    </label>
                    <input
                        className="text-neutral-200 focus:outline-none w-full h-full bg-transparent border-b border-b-neutral-700 active:border-b-red-500 active:border-b focus:border-b-red-500 focus:border-b"
                        {...register("note")}
                        type="text"
                    />
                </div>
            </div>
            <div className="bg-neutral-900 px-2 py-2 pt-3 pb-20 flex-1 rounded-t-md">
                <div className="flex gap-2 items-center justify-around">
                    <button
                        className="flex-1 rounded-lg bg-red-500 text-neutral-300 px-8 py-2"
                        type="submit"
                    >
                        Save
                    </button>
                    <button
                        className="rounded-lg border border-neutral-500 text-neutral-200 px-2 py-2"
                        type="submit"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </form>
    );
};
