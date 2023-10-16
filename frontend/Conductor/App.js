import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome } from "./screens";
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "./constants/colors";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import NewJourney from "./screens/NewJourney";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import TicketDetails from './screens/TicketDetails'
import QRDisplay from "./screens/QRDisplay";

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
          name="NewJourney"
          component={NewJourney}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TicketDetails"
          component={TicketDetails}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="QRDisplay"
          component={QRDisplay}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
