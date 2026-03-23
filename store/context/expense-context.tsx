import { createContext, useState, type ReactNode } from "react";


import type { Expense } from "types/expense";

interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    updateExpense: (id: string, expenseData: Omit<Expense, 'id'>) => void;
    deleteExpense: (id: string) => void;
    overwriteExpenses: (expenses: Expense[]) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
    expenses: [],
    addExpense: (_expense: Expense) => {},
    updateExpense: (_id: string, _expenseData: Omit<Expense, 'id'>) => {},
    deleteExpense: (_id: string) => {},
    overwriteExpenses: (_expenses: Expense[]) => {},

});

export function ExpenseContextProvider({ children }: { children: ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    function addExpense(expense: Expense) {
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
    }

    function updateExpense(id: string, expenseData: Omit<Expense, 'id'>) {
        setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense.id === id ? { ...expense, ...expenseData } : expense
            )
        );
    }

    function overwriteExpenses(expenses: Expense[]) {
        setExpenses(expenses);
    }

    function deleteExpense(id: string) {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    }

    return (<ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense, overwriteExpenses }} >
        {children}
    </ExpenseContext.Provider>)
}