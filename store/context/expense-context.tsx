import { createContext, useState, type ReactNode } from "react";


import type { Expense } from "types/expense";

interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    deleteExpense: (id: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
    expenses: [],
    addExpense: (_expense: Expense) => {},
    deleteExpense: (_id: string) => {},
});

export function ExpenseContextProvider({ children }: { children: ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    function addExpense(expense: Expense) {
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
    }

    function deleteExpense(id: string) {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    }

    return (<ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }} >
        {children}
    </ExpenseContext.Provider>)
}