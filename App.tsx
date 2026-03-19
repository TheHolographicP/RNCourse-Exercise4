import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Colors from 'constants/colors';

import { RecentExpensesView } from 'screens/RecentExpensesView';
import { AllExpensesView } from 'screens/AllExpensesView';
import { ExpenseContextProvider } from 'store/context/expense-context';
import { TabParamList } from 'types/nav';

const TabsNavigator = createBottomTabNavigator<TabParamList>();

const TabsNavOptions = {
	screenOptions: {
		headerStyle: { backgroundColor: Colors.primary1 },
		headerTintColor: 'white',
		tabBarStyle: { backgroundColor: Colors.primary1 },
		tabBarActiveTintColor: 'white',
		tabBarInactiveTintColor: Colors.primary3,
	},
}

export default function App() { 
	return <ExpenseContextProvider>
		<NavigationContainer>
			<TabsNavigator.Navigator {...TabsNavOptions}>
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
			</TabsNavigator.Navigator>
		</NavigationContainer>
	</ExpenseContextProvider>
}
