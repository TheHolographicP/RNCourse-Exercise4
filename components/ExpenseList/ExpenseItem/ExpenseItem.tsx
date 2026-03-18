import { StyleSheet, View, Text } from 'react-native';
import { ExpenseButton } from 'components/ExpenseList/ExpenseItem/ExpenseButton';

import LAYOUT from 'constants/layout';

interface ExpenseItemProps {
    title: string;
    date: Date;
    value: number;
}

export function ExpenseItem({ title, date, value }: ExpenseItemProps) {
    return <View style={styles.expenseContainer}>
        <View style={styles.expenseDetailsContainer}>
            <Text style={styles.expenseTitle}>
                {title}
            </Text>
            <Text style={styles.expenseDate}>
                {date.toDateString()}
            </Text>
        </View>
        <ExpenseButton expenseValue={value} onPress={() => {}} />
    </View>

}



const styles = StyleSheet.create({
    expenseContainer: {
        padding: LAYOUT.padding,
        borderRadius: LAYOUT.borderRadius,
        overflow: 'hidden',
    },
    expenseDetailsContainer: {
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
    expenseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    expenseDate: {
        fontSize: 12,
        color: 'gray',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});