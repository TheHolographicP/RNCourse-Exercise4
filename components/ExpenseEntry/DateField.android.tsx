import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { GenericButton } from 'components/GenericButton';
import { useEffect, useState } from 'react';

import LAYOUT from 'constants/layout';
import Colors from 'constants/colors';

type Props = {
    onPickedDate: (date: Date) => void;
    value?: Date;
    maximumDate?: Date;
};

export function DateField({ onPickedDate, value, maximumDate }: Props) {
    var [pickedDate, setPickedDate] = useState(value ?? new Date());
    var [datePickerOpen, setDatePickerOpen] = useState(false);

    useEffect(() => {
        if (value) {
            setPickedDate(value);
        }
    }, [value]);
    
    
    return <View style={styles.container}>
        <Text style={styles.input}>{pickedDate.toDateString()}</Text>
        <GenericButton content='Pick Date' onPress={() => setDatePickerOpen(true)} color={Colors.primary1} />
        {datePickerOpen && (
            <DateTimePicker
            value={pickedDate}
            mode='date'
            display='default'
            maximumDate={maximumDate}
            onChange={(event, date) => {
                if (date) {
                    setPickedDate(date);
                    onPickedDate(date);
                }
                setDatePickerOpen(false);
            }}
            />
        )}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: LAYOUT.gap,
        flex: 1,
    },
    input: {
        flex: 1,
        borderColor: Colors.primary1,
        borderWidth: 1,
        borderRadius: LAYOUT.borderRadius,
        padding: LAYOUT.padding,
    },
})
