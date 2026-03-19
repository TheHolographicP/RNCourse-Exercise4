import { AddExpenseButton } from 'components/AddExpenseButton';
import { useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from 'types/nav';

type Props = BottomTabScreenProps<TabParamList, 'RecentExpensesView'>;

export function RecentExpensesView({ navigation }: Props) {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AddExpenseButton
                    color='white'
                    onPress={addExpenseHandler}
                />
            ),

        });
    }, [navigation]);
    
    function addExpenseHandler() {
    };

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