import { StyleSheet, View, Text } from 'react-native';



export function AllExpensesView() {
    return <View style={styles.rootScreen}>
        <Text>
            All Expenses View
        </Text>
    </View>
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});