import axios from 'axios';
import { Expense } from 'types/expense';

const BACKEND_URL = 'https://react-native-course-7fe21-default-rtdb.firebaseio.com';

export async function apiStoreExpense(expenseData: Omit<Expense, 'id'>) {
    const response = await axios.post(
        `${BACKEND_URL}/expenses.json`, 
        expenseData
    );
    
    return response.data.name;
}

export async function apiFetchExpenses() {
    var expenseJSON = await axios.get(
        `${BACKEND_URL}/expenses.json`
    );
    
    
    return expenseJSON.data ? Object.keys(expenseJSON.data).map((key) => {
        const expenseData = expenseJSON.data[key];
        const expense: Expense = {
            id: key,
            title: expenseData.title,
            value: expenseData.value,
            date: new Date(expenseData.date),
        };
        return expense;
    }) : [];
}

export function apiSaveExpense(id: string, expenseData: Omit<Expense, 'id'>) {
    return axios.put(
        `${BACKEND_URL}/expenses/${id}.json`, 
        expenseData
    );
}

export function apiDeleteExpense(id: string) {
    return axios.delete(
        `${BACKEND_URL}/expenses/${id}.json`
    );
}