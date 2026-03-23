import { StyleSheet, View, Text } from 'react-native';

import Colors from 'constants/colors';
import LAYOUT from 'constants/layout';

type TotalBarProps = {
    label: string;
    amount: number;
};

export function TotalBar({ label, amount }: TotalBarProps) {
    return <View style={styles.totalBar}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.amount}>{`$${amount.toFixed(2)}`}</Text>
    </View>
}

const styles = StyleSheet.create({
    totalBar: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.primary3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: LAYOUT.borderRadius,
        paddingHorizontal: LAYOUT.padding,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});