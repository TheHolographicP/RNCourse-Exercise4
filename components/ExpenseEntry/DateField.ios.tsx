import { View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

    useEffect(() => {
        if (value) {
            setPickedDate(value);
        }
    }, [value]);
    
    return <View style={styles.container}>
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
            }}
        />
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
