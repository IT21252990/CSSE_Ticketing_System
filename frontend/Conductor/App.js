import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Welcome } from "./screens";
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "./constants/colors";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import QRScanner from "./screens/QRScanner";
import QRScannedDetails from './screens/QRScannedDetails'
import eTicketDisplay from './screens/eTicketDisplay'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: COLORS.primary,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="QRScanner"
          component={QRScanner}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QRScannedDetails"
          component={QRScannedDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="eTicketDisplay"
          component={eTicketDisplay}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
