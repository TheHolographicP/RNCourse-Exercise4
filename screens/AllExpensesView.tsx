import { AddExpenseButton } from 'components/AddExpenseButton';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ExpenseList } from 'components/ExpenseList/ExpenseList';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from 'types/nav';

import { ExpenseContext } from 'store/context/expense-context';
import { apiFetchExpenses } from 'api/expenseAPI';

import { LoadingOverlay } from 'components/LoadingOverlay';
import { ErrorOverlay } from 'components/ErrorOverlay';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'AllExpensesView'>,
    NativeStackScreenProps<RootStackParamList>
>;

export function AllExpensesView({ navigation }: Props) {
    const expenseContext = useContext(ExpenseContext);

    var totalExpenses = expenseContext.expenses.reduce((total, expense) => total + expense.value, 0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchExpenseData() {
            setLoading(true);
            try {
                const fetchedExpenses = await apiFetchExpenses();
                expenseContext.overwriteExpenses(fetchedExpenses);
            } catch (err) {
                setError('Failed to fetch expenses.');
            }
            setLoading(false);
        }
        fetchExpenseData();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AddExpenseButton
                    color='white'
                    onPress={addExpenseHandler}
                />
            ),

        });
    }, [navigation]);
    
    function addExpenseHandler() {
        navigation.navigate('ExpenseEditor');
    };

    if (error) {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
    }


    if (loading) {
        return <LoadingOverlay />;
    }

    return <View style={styles.rootScreen}>
        <ExpenseList
            expenses={expenseContext.expenses}
            totalAmount={totalExpenses}
            headerTitle="All Expenses"
            onSelectExpense={(expenseId) => navigation.navigate('ExpenseEditor', { expenseId })}
        />
    </View>
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});