import { StyleSheet, View, Text, Pressable } from 'react-native';

import LAYOUT from 'constants/layout';
import Colors from 'constants/colors';
import { Expense } from 'types/expense';

interface ExpenseItemProps {
    expense: Expense;
    onPress: () => void;
}

export function ExpenseItem({ expense, onPress }: ExpenseItemProps) {

    const { title, date, value } = expense;

    return <View style={styles.expenseItemRoot}>
        <Pressable onPress={onPress} style={styles.expenseContainer}>
            <View style={styles.expenseDetailsContainer}>
                <Text style={styles.expenseTitle}>
                    {title}
                </Text>
                <Text style={styles.expenseDate}>
                    {date.toDateString()}
                </Text>
            </View>
            <Text style={styles.valueText}>
                ${value.toFixed(2)}
            </Text>
        </Pressable>
    </View>

}



const styles = StyleSheet.create({
    expenseItemRoot: {
        flex: 1,
        padding: LAYOUT.padding,
        borderRadius: LAYOUT.borderRadius,
        overflow: 'hidden',
        backgroundColor: Colors.primary4,
    },
    expenseContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expenseDetailsContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    expenseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    expenseDate: {
        fontSize: 12,
        color: 'white',
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});