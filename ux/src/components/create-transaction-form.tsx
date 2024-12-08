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
            className="mt-5 bg-neutral-900 px-2 py-2 rounded-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="h-7 flex items-center mt-2">
                <label className="text-neutral-500 w-4/12" htmlFor="amount">
                    Amount
                </label>
                <input
                    {...register("number", { required: true })}
                    type="number"
                    className="text-neutral-200 w-full h-full focus:outline-none bg-transparent border-b border-b-neutral-700 active:border-b-red-500 active:border-b focus:border-b-red-500 focus:border-b"
                />
            </div>

            <div className="h-7 flex items-center mt-2">
                <label className="text-neutral-500 w-4/12" htmlFor="category">
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
            <div className="h-7 flex items-center mt-2">
                <label className="w-4/12 text-neutral-500" htmlFor="note">
                    Note
                </label>
                <input
                    className="text-neutral-200 focus:outline-none w-full h-full bg-transparent border-b border-b-neutral-700 active:border-b-red-500 active:border-b focus:border-b-red-500 focus:border-b"
                    {...register("note")}
                    type="text"
                />
            </div>

            <div className="flex items-center justify-around mt-5">
                <button className="rounded-lg bg-red-500 text-neutral-300 px-8 py-2" type="submit">
                    Save
                </button>
                <button
                    className="rounded-lg bg-neutral-300 px-8 py-2 text-neutral-950"
                    type="submit"
                >
                    Continue
                </button>
            </div>
        </form>
    );
};
