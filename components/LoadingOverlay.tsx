import Colors from 'constants/colors';
import { View, StyleSheet, ActivityIndicator } from 'react-native';


export function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
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
});

