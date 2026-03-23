import { AddExpenseButton } from 'components/AddExpenseButton';
import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ExpenseList } from 'components/ExpenseList/ExpenseList';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from 'types/nav';

import { ExpenseContext } from 'store/context/expense-context';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'AllExpensesView'>,
    NativeStackScreenProps<RootStackParamList>
>;

export function AllExpensesView({ navigation }: Props) {
    const expenseContext = useContext(ExpenseContext);

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
        navigation.navigate('ExpenseEditor');
    };

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