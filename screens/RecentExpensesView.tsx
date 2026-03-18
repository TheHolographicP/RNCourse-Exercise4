import { StyleSheet, View, Text } from 'react-native';



export function RecentExpensesView() {
    return <View style={styles.rootScreen}>
        <Text>
            Recent Expenses View
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