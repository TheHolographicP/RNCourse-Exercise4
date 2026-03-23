import Colors from 'constants/colors';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { GenericButton } from 'components/GenericButton';


export function ErrorOverlay({ message, onConfirm }: { message: string; onConfirm: () => void }) {
    return (
        <View style={styles.container}>
            <Text style={styles.errorTitle}>An error occurred!</Text>
            <Text style={styles.errorMessage}>{message}</Text>
            <View style={styles.buttonContainer}>
                <GenericButton content="Okay" onPress={onConfirm} color='white'/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary1
    },
    buttonContainer: {
        maxHeight: 48,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 14,
        color: 'white',
        marginBottom: 16,
    },
});

