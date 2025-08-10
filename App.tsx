import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import "./global.css"

import Dashboard from './screens/Dashboard';
import Camera from './screens/Camera';
import Quiz_APP from './screens/Quiz_APP';
import Quiz_TataSurya from './screens/quiz_tata_surya';
import Quiz_Gerhana from './screens/quiz_gerhana';

// Ignore specific warnings that might be causing issues
LogBox.ignoreLogs([
  'Warning: Failed prop type',
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Quiz_APP"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Scan" component={Camera} />
          <Stack.Screen name="Quiz_APP" component={Quiz_APP} />
          <Stack.Screen name="Quiz_TataSurya" component={Quiz_TataSurya} />
          <Stack.Screen name="Quiz_Gerhana" component={Quiz_Gerhana} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}