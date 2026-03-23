import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
    AllExpensesView: undefined;
    RecentExpensesView: undefined;
};

export type RootStackParamList = {
    Tabs: NavigatorScreenParams<TabParamList>;
    ExpenseEditor: {
        expenseId?: string;
    } | undefined;
};