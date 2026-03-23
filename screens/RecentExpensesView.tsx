import { AddExpenseButton } from 'components/AddExpenseButton';
import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from 'types/nav';
import { ExpenseContext } from 'store/context/expense-context';

import { ExpenseList } from 'components/ExpenseList/ExpenseList';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'RecentExpensesView'>,
    NativeStackScreenProps<RootStackParamList>
>;

export function RecentExpensesView({ navigation }: Props) {
    const expenseContext = useContext(ExpenseContext);

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
        navigation.navigate('ExpenseEditor');
    };

    return <View style={styles.rootScreen}>
        <ExpenseList
            expenses={recentExpenses}
            totalAmount={totalExpenses}
            headerTitle="Last 7 Days"
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