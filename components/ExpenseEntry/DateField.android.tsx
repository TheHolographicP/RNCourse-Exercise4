import { View, Text, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { GenericButton } from 'components/GenericButton';
import { useState } from 'react';

import LAYOUT from 'constants/layout';
import Colors from 'constants/colors';

type Props = {
    onPickedDate: (date: Date) => void;
};

export function DateField({ onPickedDate }: Props) {
    var [pickedDate, setPickedDate] = useState(new Date());
    var [labelValue, setLabelValue] = useState('Select Date');
    var [datePickerOpen, setDatePickerOpen] = useState(false);
    
    
    return <View style={styles.container}>
        <Text style={styles.input}>{labelValue}</Text>
        <GenericButton content='Pick Date' onPress={() => setDatePickerOpen(true)} color={Colors.primary1} />
        {datePickerOpen && (
            <DateTimePicker
            value={pickedDate}
            mode='date'
            display='default'
            onChange={(event, date) => {
                if (date) {
                    setPickedDate(date);
                    setLabelValue(date.toDateString());
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
