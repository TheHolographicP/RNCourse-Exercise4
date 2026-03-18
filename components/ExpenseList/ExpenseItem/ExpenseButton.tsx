import { View, Text, Pressable, StyleSheet } from 'react-native';

import LAYOUT from 'constants/layout';
import Colors from 'constants/colors';

interface ExpenseButtonProps {
    expenseValue: number;
    onPress: () => void;
}

export function ExpenseButton({ expenseValue, onPress }: ExpenseButtonProps) {
    return <View style={styles.buttonContainer}>
        <Pressable onPress={onPress}>
            <Text style={styles.buttonText}>
                {expenseValue}
            </Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: LAYOUT.padding,
        borderRadius: LAYOUT.borderRadius,
        overflow: 'hidden',
    },
        buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
