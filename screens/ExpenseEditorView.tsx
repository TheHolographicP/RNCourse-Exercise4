import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExpenseEntry } from 'components/ExpenseEntry/ExpenseEntry';
import { ConfirmationModal } from 'components/ConfirmationModal';

import Colors from 'constants/colors';
import { ExpenseContext } from 'store/context/expense-context';
import type { RootStackParamList } from 'types/nav';

import { apiStoreExpense, apiSaveExpense, apiDeleteExpense } from 'api/expenseAPI';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { ErrorOverlay } from 'components/ErrorOverlay';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseEditor'>;

export function ExpenseEditorView({ navigation, route }: Props) {
    const { expenses, addExpense, updateExpense, deleteExpense } = useContext(ExpenseContext);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editingExpense = useMemo(
        () => expenses.find((expense) => expense.id === route.params?.expenseId),
        [expenses, route.params?.expenseId]
    );


    const isEditing = Boolean(editingExpense);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    async function handleSubmit(expenseData: { title: string; value: number; date: Date }) {
        setLoading(true);
        if (editingExpense) {
            try {
                await apiSaveExpense(editingExpense.id, expenseData);
                updateExpense(editingExpense.id, expenseData);
                
                navigation.goBack();
            } catch (err) {
                setError('Failed to save expense.');
            }
            setLoading(false);
        } else {
            try {
                const id = await apiStoreExpense(expenseData);
                addExpense({
                    id,
                    ...expenseData,
                });
                navigation.goBack();
            } catch (err) {
                setError('Failed to save expense.');
            }
            setLoading(false);
        }

        
    }

    function handleCancel() {
        navigation.goBack();
    }

    async function handleConfirmDelete() {
        if (editingExpense) {
            setLoading(true);
            try {
                await apiDeleteExpense(editingExpense.id);
                deleteExpense(editingExpense.id);

                navigation.goBack();
            } catch (err) {
                setError('Failed to delete expense.');
            }
            setLoading(false);
            setConfirmDeleteOpen(false);
        }

    }


    if (error) {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
    }

    if (loading) {
        return <LoadingOverlay />;
    }


    return <View style={styles.root}>
        <ConfirmationModal
            visible={confirmDeleteOpen}
            message='Are you sure you want to delete this expense?'
            confirmLabel='Delete'
            confirmIcon={<Ionicons name='trash' size={16} color='white' />}
            cancelIcon={<Ionicons name='close' size={16} color='white' />}
            cancelLabel='Cancel'
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmDeleteOpen(false)}
        />
        <ExpenseEntry
            onSubmit={handleSubmit}
            onClose={handleCancel}
            submitLabel={isEditing ? 'Save Changes' : 'Save'}
            initialValues={editingExpense ? {
                title: editingExpense.title,
                value: editingExpense.value,
                date: editingExpense.date,
            } : undefined}
            onDelete={isEditing ? () => setConfirmDeleteOpen(true) : undefined}
            deleteLabel='Delete'
        />
    </View>;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
});
