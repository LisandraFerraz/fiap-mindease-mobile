import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Profile } from "../navigation/screens/Profile";
import { Settings } from "../navigation/screens/Settings";
import { NotFound } from "../navigation/screens/NotFound";
import { Home } from "../navigation/screens/Home";

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Olá XXX"
        component={HomeTabs}
        options={{
          headerRight: () => (
            <Ionicons
              onPress={() => alert("This is a button!")}
              name="notifications"
              size={25}
            />
          ),
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
