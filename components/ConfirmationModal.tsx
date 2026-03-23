import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from 'constants/colors';
import LAYOUT from 'constants/layout';

type Props = {
    visible: boolean;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmIcon?: React.ReactNode;
    cancelIcon?: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmationModal({
    visible,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmIcon,
    cancelIcon,
    onConfirm,
    onCancel,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <Pressable style={styles.backdrop} onPress={onCancel}>
                <Pressable style={styles.card} onPress={() => {}}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                styles.confirmButton,
                                pressed && styles.pressed,
                            ]}
                            onPress={onConfirm}
                        >
                            {confirmIcon && (
                                <View style={styles.icon}>{confirmIcon}</View>
                            )}
                            <Text style={styles.buttonText}>{confirmLabel}</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                styles.cancelButton,
                                pressed && styles.pressed,
                            ]}
                            onPress={onCancel}
                        >
                            {cancelIcon && (
                                <View style={styles.icon}>{cancelIcon}</View>
                            )}
                            <Text style={styles.buttonText}>{cancelLabel}</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: LAYOUT.borderRadius,
        padding: LAYOUT.padding * 3,
        width: '80%',
        gap: LAYOUT.gap * 2,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    message: {
        fontSize: 16,
        color: Colors.primary3,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: LAYOUT.gap,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: LAYOUT.gap / 2,
        borderRadius: LAYOUT.borderRadius,
        padding: LAYOUT.padding,
    },
    confirmButton: {
        backgroundColor: Colors.primary4,
    },
    cancelButton: {
        backgroundColor: Colors.primary1,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
