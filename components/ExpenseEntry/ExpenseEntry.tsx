import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, Pressable } from 'react-native';

import { GenericButton } from 'components/GenericButton';

import { ExpenseContext } from 'store/context/expense-context';
import { DateField } from 'components/ExpenseEntry/DateField';

import Colors from 'constants/colors';
import LAYOUT from 'constants/layout';

type Props = {
    entryActive: boolean;
    onClose: () => void;
};


export function ExpenseEntry({ entryActive, onClose }: Props) {
    var [modalOpen, setModalOpen] = useState(entryActive);
    var [expenseName, setExpenseName] = useState('');
    var [expenseValue, setExpenseValue] = useState(0);
    var [expenseDate, setExpenseDate] = useState(new Date());

    const expenseContext = useContext(ExpenseContext);

    useEffect(() => {
        setModalOpen(entryActive);
    }, [entryActive]);


    function saveExpenseHandler() {
        console.log('Saving expense:', { expenseName, expenseValue, expenseDate });
        expenseContext.addExpense({
            id: Math.random().toString(),
            title: expenseName,
            value: expenseValue,
            date: expenseDate,
        });
        setModalOpen(false);
        onClose();
    }

    function cancelExpenseHandler() {
        console.log('Cancelling expense entry');
        setModalOpen(false);
        onClose();
    }

    function handleExpenseValueChange(text: string) {
        if (/\.\d{3,}/.test(text)) return;
        const parsed = parseFloat(text);
        if (!isNaN(parsed) && parsed >= 0) {
            setExpenseValue(parsed);
        }
    }

    return <Modal visible={modalOpen} animationType='slide' style={styles.modalContainer}>
        <Text style={styles.screenTitle}>
            Expense Entry
        </Text>
        <View style={styles.inputContainer}>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Expense Title:</Text>
                <TextInput 
                    placeholder='Expense Name'
                    value={expenseName}
                    onChangeText={setExpenseName}
                    style={styles.input}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Expense Value:</Text>
                <TextInput 
                    placeholder='Expense Value'
                    keyboardType='decimal-pad'
                    value={expenseValue.toString()}
                    onChangeText={handleExpenseValueChange}
                    style={styles.input}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Expense Date:</Text>
                <DateField onPickedDate={setExpenseDate} />
            </View>

            <View style={styles.buttonContainer}>
                <GenericButton content="Save" onPress={saveExpenseHandler} />
                <GenericButton content="Cancel" onPress={cancelExpenseHandler} />
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: Colors.primary1,
        gap: LAYOUT.gap,
        flex: 1,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: LAYOUT.gap,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: LAYOUT.gap,
    },
    fieldLabel: {
        minWidth: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        borderColor: Colors.primary1,
        borderWidth: 1,
        padding: LAYOUT.padding,
        borderRadius: LAYOUT.borderRadius,
    }

});