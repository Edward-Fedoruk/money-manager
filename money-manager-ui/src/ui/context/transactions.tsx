import { createContext, FC, ReactNode } from "react";

export const TransactionContext = createContext({
    saveTransaction: () => {},
});

const TransactionProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <TransactionContext.Provider>{children}</TransactionContext.Provider>
    );
};
