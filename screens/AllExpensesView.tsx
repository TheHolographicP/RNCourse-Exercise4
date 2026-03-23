import { AddExpenseButton } from 'components/AddExpenseButton';
import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ExpenseList } from 'components/ExpenseList/ExpenseList';
import { ExpenseEntry } from 'components/ExpenseEntry/ExpenseEntry';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from 'types/nav';

import { ExpenseContext } from 'store/context/expense-context';

type Props = BottomTabScreenProps<TabParamList, 'AllExpensesView'>;

export function AllExpensesView({ navigation }: Props) {
    const expenseContext = useContext(ExpenseContext);

    var [expenseEntryOpen, setExpenseEntryOpen] = useState(false);

    var totalExpenses = expenseContext.expenses.reduce((total, expense) => total + expense.value, 0);


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
            expenses={expenseContext.expenses}
            totalAmount={totalExpenses}
            headerTitle="All Expenses"
        />
        <ExpenseEntry entryActive={expenseEntryOpen} onClose={() => setExpenseEntryOpen(false)} />
    </View>
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});