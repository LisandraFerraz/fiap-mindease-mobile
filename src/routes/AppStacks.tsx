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
import { Settings } from "../navigation/screens/Settings";
import { Icon } from "../components/ui/Icon";
import { MEIcons } from "../utils/functions/Icon-config/icon-mapping";
import { StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        options={{ headerShown: false }}
        component={HomeTabs}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="Menu" component={AppMenu} />
      <Stack.Screen name="Pomodoro" component={Pomodoro} />
      <Stack.Screen name="Kanban" component={Kanban} />
      <Stack.Screen name="Checklist" component={Checklist} />
      <Stack.Screen name="StickyNotes" component={StickyNotes} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        title: "Hometabs",
        tabBarInactiveBackgroundColor: "#81818111",
        tabBarIcon: () => {
          let iconName: keyof typeof MEIcons;

          if (route.name === "Menu") {
            iconName = "menu";
          }
          if (route.name === "Settings") {
            iconName = "settings";
          }
          if (route.name === "Home") {
            iconName = "home";
          }

          return <Icon name={iconName!} />;
        },
      })}
    >
      <Tab.Screen
        name="Menu"
        options={{
          header: () => <Header routeName="Menu" />,
        }}
        component={AppMenu}
      />
      <Tab.Screen
        options={{
          header: () => <Header routeName="Home" />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}
