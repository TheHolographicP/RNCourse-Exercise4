import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Colors from 'constants/colors';

import { RecentExpensesView } from 'screens/RecentExpensesView';
import { AllExpensesView } from 'screens/AllExpensesView';
import { ExpenseEditorView } from 'screens/ExpenseEditorView';
import { ExpenseContextProvider } from 'store/context/expense-context';
import { RootStackParamList, TabParamList } from 'types/nav';

const TabsNavigator = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const TabsNavOptions = {
	screenOptions: {
		headerStyle: { backgroundColor: Colors.primary1 },
		headerTintColor: 'white',
		tabBarStyle: { backgroundColor: Colors.primary1 },
		tabBarActiveTintColor: 'white',
		tabBarInactiveTintColor: Colors.primary3,
	},
}

function TabsLayout() {
	return <TabsNavigator.Navigator {...TabsNavOptions}>
		<TabsNavigator.Screen 
			name='AllExpensesView'
			component={AllExpensesView}
			options={{
			title: 'All Expenses',
			tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />
			}}
		/>
		<TabsNavigator.Screen 
			name='RecentExpensesView'
			component={RecentExpensesView}
			options={{
				title: 'Recent Expenses',
				tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
			}}
		/>
	</TabsNavigator.Navigator>;
}

export default function App() { 
	return <ExpenseContextProvider>
		<SafeAreaProvider>
			<NavigationContainer>
				<RootStack.Navigator>
					<RootStack.Screen
						name='Tabs'
						component={TabsLayout}
						options={{ headerShown: false }}
					/>
					<RootStack.Screen
						name='ExpenseEditor'
						component={ExpenseEditorView}
						options={{
							headerBackButtonDisplayMode: 'minimal',
							headerStyle: { backgroundColor: Colors.primary1 },
							headerTintColor: 'white',
						}}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	</ExpenseContextProvider>
}
