import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GenericButton } from 'components/GenericButton';
import { DateField } from 'components/ExpenseEntry/DateField';

import Colors from 'constants/colors';
import LAYOUT from 'constants/layout';

import type { Expense } from 'types/expense';

type Props = {
    onClose: () => void;
    onSubmit: (expenseData: Omit<Expense, 'id'>) => void;
    initialValues?: Omit<Expense, 'id'>;
    submitLabel?: string;
    deleteLabel?: string;
    onDelete?: () => void;
};

type ExpenseEntryErrors = {
    title?: string;
    value?: string;
    date?: string;
};

export function ExpenseEntry({
    onClose,
    onSubmit,
    initialValues,
    submitLabel = 'Save',
    deleteLabel = 'Delete',
    onDelete,
}: Props) {
    var [expenseName, setExpenseName] = useState('');
    var [expenseValueInput, setExpenseValueInput] = useState('');
    var [expenseDate, setExpenseDate] = useState(new Date());
    var [errors, setErrors] = useState<ExpenseEntryErrors>({});

    const insets = useSafeAreaInsets();

    useEffect(() => {
        setExpenseName(initialValues?.title ?? '');
        setExpenseValueInput(initialValues ? initialValues.value.toString() : '');
        setExpenseDate(initialValues?.date ?? new Date());
        setErrors({});
    }, [initialValues]);

    function saveExpenseHandler() {
        const validationErrors: ExpenseEntryErrors = {};
        const normalizedTitle = expenseName.trim();
        const normalizedValueText = expenseValueInput.trim();
        const parsedValue = Number(normalizedValueText);

        if (!normalizedTitle) {
            validationErrors.title = 'Title is required.';
        }

        if (!normalizedValueText) {
            validationErrors.value = 'Amount is required.';
        } else if (!/^\d*(?:\.\d{1,2})?$/.test(normalizedValueText) || !Number.isFinite(parsedValue)) {
            validationErrors.value = 'Amount must be a number with up to two decimal places.';
        } else if (parsedValue <= 0) {
            validationErrors.value = 'Amount must be greater than 0.';
        }

        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (expenseDate > today) {
            validationErrors.date = 'Date cannot be in the future.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            title: normalizedTitle,
            value: parsedValue,
            date: expenseDate,
        });
    }

    function cancelExpenseHandler() {
        setErrors({});
        onClose();
    }

    function handleTitleChange(text: string) {
        setExpenseName(text);
        if (errors.title) {
            setErrors(prev => ({ ...prev, title: undefined }));
        }
    }

    function handleExpenseValueChange(text: string) {
        setExpenseValueInput(text);
        if (errors.value) {
            setErrors(prev => ({ ...prev, value: undefined }));
        }
    }

    function formatExpenseValueOnBlur() {
        const trimmed = expenseValueInput.trim();
        if (trimmed === '') {
            return;
        }

        const [integerPart, decimalPart] = trimmed.split('.');
        const normalizedInteger = integerPart.replace(/^0+(?=\d)/, '');
        const safeInteger = normalizedInteger === '' ? '0' : normalizedInteger;
        const formattedValue = decimalPart !== undefined ? `${safeInteger}.${decimalPart}` : safeInteger;

        setExpenseValueInput(formattedValue);
    }

    function handleDateChange(date: Date) {
        setExpenseDate(date);
        if (errors.date) {
            setErrors(prev => ({ ...prev, date: undefined }));
        }
    }

    const styles = StyleSheet.create({
        modalContainer: {
            backgroundColor: 'white',
            gap: LAYOUT.gap,
            flex: 1,
        },
        safeArea: {
            flex: 1,
            paddingTop: insets.top + LAYOUT.padding,
            paddingBottom: insets.bottom + LAYOUT.padding,
            paddingHorizontal: LAYOUT.padding,
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
        },
        errorText: {
            color: Colors.primary1,
            alignSelf: 'flex-end',
            marginTop: -6,
            marginBottom: 2,
        },
    });

    return <View style={styles.modalContainer}>
        <View style={styles.safeArea}>
            <View style={styles.inputContainer}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Expense Title:</Text>
                    <TextInput
                        placeholder='Expense Name'
                        value={expenseName}
                        onChangeText={handleTitleChange}
                        style={styles.input}
                    />
                </View>
                {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
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
                {errors.value && <Text style={styles.errorText}>{errors.value}</Text>}
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Expense Date:</Text>
                    <DateField
                        onPickedDate={handleDateChange}
                        value={expenseDate}
                        maximumDate={new Date()}
                    />
                </View>
                {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

                <View style={styles.buttonContainer}>
                    <GenericButton content={submitLabel} onPress={saveExpenseHandler} />
                    {onDelete && <GenericButton content={deleteLabel} onPress={onDelete} color={Colors.primary1} textColor='white' />}
                    <GenericButton content='Cancel' onPress={cancelExpenseHandler} />
                </View>
            </View>
        </View>
    </View>;
}
