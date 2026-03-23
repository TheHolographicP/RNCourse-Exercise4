import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    var [expenseValueInput, setExpenseValueInput] = useState('0');
    var [expenseDate, setExpenseDate] = useState(new Date());

    const expenseContext = useContext(ExpenseContext);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setModalOpen(entryActive);
    }, [entryActive]);


    function saveExpenseHandler() {
        expenseContext.addExpense({
            id: Math.random().toString(),
            title: expenseName,
            value: expenseValue,
            date: expenseDate,
        });
        setModalOpen(false);
        setExpenseName('');
        setExpenseValue(0);
        setExpenseValueInput('0');
        setExpenseDate(new Date());
        onClose();
    }

    function cancelExpenseHandler() {
        setModalOpen(false);
        setExpenseName('');
        setExpenseValue(0);
        setExpenseValueInput('0');
        setExpenseDate(new Date());
        onClose();
    }

    function handleExpenseValueChange(text: string) {
        if (text === '') {
            setExpenseValueInput('');
            setExpenseValue(0);
            return;
        }

        // Allow only non-negative decimals with up to two digits after the dot.
        if (!/^\d*(?:\.\d{0,2})?$/.test(text)) return;

        const normalizedText = text === '.' ? '0.' : text;
        setExpenseValueInput(normalizedText);

        const parsed = parseFloat(normalizedText);
        if (!isNaN(parsed) && parsed >= 0) {
            setExpenseValue(parsed);
        }
    }

    function formatExpenseValueOnBlur() {
        if (expenseValueInput === '' || expenseValueInput === '.') {
            setExpenseValueInput('0');
            setExpenseValue(0);
            return;
        }

        const [integerPart, decimalPart] = expenseValueInput.split('.');
        const normalizedInteger = integerPart.replace(/^0+(?=\d)/, '');
        const safeInteger = normalizedInteger === '' ? '0' : normalizedInteger;
        const formattedValue =
            decimalPart !== undefined ? `${safeInteger}.${decimalPart}` : safeInteger;

        setExpenseValueInput(formattedValue);

        const parsed = parseFloat(formattedValue);
        if (!isNaN(parsed) && parsed >= 0) {
            setExpenseValue(parsed);
        }
    }

    const styles = StyleSheet.create({
        modalContainer: {
            backgroundColor: Colors.primary1,
            gap: LAYOUT.gap,
            flex: 1,
        },
        safeArea: {
            flex: 1,
            paddingTop: insets.top + LAYOUT.padding,
            paddingBottom: insets.bottom + LAYOUT.padding,
            paddingHorizontal: LAYOUT.padding,
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
            width: '70%',
            alignSelf: 'center',
            gap: LAYOUT.gap,
        },
        input: {
            flex: 1,
            borderColor: Colors.primary1,
            borderWidth: 1,
            padding: LAYOUT.padding,
            borderRadius: LAYOUT.borderRadius,
        }

    });

    return <Modal visible={modalOpen} animationType='slide' style={styles.modalContainer}>
        <View style={styles.safeArea}>
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
                        value={expenseValueInput}
                        onChangeText={handleExpenseValueChange}
                        onBlur={formatExpenseValueOnBlur}
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
        </View>
    </Modal>
}

