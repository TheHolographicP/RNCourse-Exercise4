import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';

import LAYOUT from 'constants/layout';
import Colors from 'constants/colors';
import { Expense } from 'types/expense';

import { ExpenseContext } from 'store/context/expense-context';
import { ConfirmationModal } from 'components/ConfirmationModal';

interface ExpenseItemProps {
    expense: Expense
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
    const [cancelDialogueVisible, setCancelDialogueVisible] = useState(false);

    const { id, title, date, value } = expense;
    const { deleteExpense } = useContext(ExpenseContext);

    function onDelete() {
        setCancelDialogueVisible(true);
    }

    function onConfirmDelete() {
        deleteExpense(id);
        setCancelDialogueVisible(false);
    }

    function onCancelDelete() {
        setCancelDialogueVisible(false);
    }

    return <View style={styles.expenseItemRoot}>
        <ConfirmationModal
            visible={cancelDialogueVisible}
            message="Are you sure you want to delete this expense?"
            confirmLabel="Delete"
            confirmIcon={<Ionicons name="trash" size={16} color="white" />}
            cancelIcon={<Ionicons name="close" size={16} color="white" />}
            cancelLabel="Cancel"
            onConfirm={onConfirmDelete}
            onCancel={onCancelDelete}
        />
        <Pressable onPress={onDelete} style={styles.expenseContainer}>
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