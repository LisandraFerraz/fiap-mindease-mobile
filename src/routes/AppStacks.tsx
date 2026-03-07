import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NotFound } from "../navigation/screens/NotFound";
import { Home } from "../navigation/screens/Home";
import { Header } from "../components/ui/Header";
import { AppMenu } from "../navigation/screens/AppMenu";
import { Pomodoro } from "../navigation/screens/Pomodoro";
import { Kanban } from "../navigation/screens/Kanban";
import { Checklist } from "../navigation/screens/Checklist";
import { StickyNotes } from "../navigation/screens/StickyNotes";

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        options={{ headerShown: false }}
        component={HomeTabs}
      />

      <Stack.Screen name="Olá, xxxx" component={Home} />
      <Stack.Screen
        name="AppMenu"
        options={{ headerShown: false }}
        component={AppMenu}
      />
      <Stack.Screen name="Pomodoro" component={Pomodoro} />
      <Stack.Screen name="Kanban" component={Kanban} />
      <Stack.Screen name="Checklist" component={Checklist} />
      <Stack.Screen name="StickyNotes" component={StickyNotes} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        title: "Hometabs",
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else {
            iconName = "reorder-three-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{
          header: () => <Header />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="AppMenu"
        options={{ headerShown: false }}
        component={AppMenu}
      />
    </Tab.Navigator>
  );
}
