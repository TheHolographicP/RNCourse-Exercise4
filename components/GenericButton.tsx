import {Pressable, PressableProps, StyleSheet, View, Text} from 'react-native';

import Colors from 'constants/colors';
import LAYOUT from 'constants/layout';

type GenericButtonProps = {
    content: string;
    onPress: () => void;
    color?: string;
    textColor?: string;
};

export function GenericButton({ content, onPress, color = Colors.primary1, textColor = 'black' }: GenericButtonProps) {
    const styles = StyleSheet.create({
        button: {
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: LAYOUT.borderRadius,
            padding: LAYOUT.padding,
            backgroundColor: color,
            flex: 1
        },
    });

    return (
        <View style={styles.button}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1,
                    },
                ]}
            >
                <Text>{content}</Text>
            </Pressable>
        </View>
    );
}

