import {Pressable, PressableProps, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from 'constants/colors';
import LAYOUT from 'constants/layout';

type IconButtonProps = PressableProps & {
    onPress: () => void;
    color?: string;
    size?: number;
};

export function AddExpenseButton({ onPress, color = Colors.primary1, size = 24}: IconButtonProps) {
    const styles = StyleSheet.create({
        button: {
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    opacity: pressed ? 0.7 : 1,
                },
            ]}
        >
            <Ionicons name='add' size={size} color={color} style={{lineHeight:size}}/>
        </Pressable>
    );
}

