import { View, StyleSheet, FlatList } from 'react-native';

import { TotalBar } from 'components/ExpenseList/TotalBar';
import { ExpenseItem } from 'components/ExpenseList/ExpenseItem/ExpenseItem';
import { Expense } from 'types/expense';
import LAYOUT from 'constants/layout';

type Props = {
    expenses: Expense[];
    totalAmount: number;
    headerTitle: string;
};


export function ExpenseList({ expenses, totalAmount, headerTitle }: Props) {
    return <View style={styles.rootContainer}>
        <TotalBar label={headerTitle} amount={totalAmount} />
        <FlatList
            data={expenses}
            renderItem={({ item }) => <ExpenseItem expense={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: LAYOUT.gap }} />}
        />
    </View>
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: LAYOUT.padding,
        gap: LAYOUT.gap * 2,
    },
    
});