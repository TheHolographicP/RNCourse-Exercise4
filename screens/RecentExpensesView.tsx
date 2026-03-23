import { AddExpenseButton } from 'components/AddExpenseButton';
import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from 'types/nav';
import { ExpenseContext } from 'store/context/expense-context';

import { ExpenseList } from 'components/ExpenseList/ExpenseList';
import { ExpenseEntry } from 'components/ExpenseEntry/ExpenseEntry';

type Props = BottomTabScreenProps<TabParamList, 'RecentExpensesView'>;

export function RecentExpensesView({ navigation }: Props) {
    const expenseContext = useContext(ExpenseContext);
    var [expenseEntryOpen, setExpenseEntryOpen] = useState(false);

    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentExpenses = expenseContext.expenses.filter(
        expense => expense.date >= oneWeekAgo && expense.date <= today
    );

    var totalExpenses = recentExpenses.reduce((total, expense) => total + expense.value, 0);
    
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
        setExpenseEntryOpen(true);
    };

    return <View style={styles.rootScreen}>
        <ExpenseList
            expenses={recentExpenses}
            totalAmount={totalExpenses}
            headerTitle="Last 7 Days"
        />
        <ExpenseEntry
            entryActive={expenseEntryOpen}
            onClose={() => setExpenseEntryOpen(false)}
            onSubmit={(expenseData) => {
                expenseContext.addExpense({
                    id: Math.random().toString(),
                    ...expenseData,
                });
            }}
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