import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotFound } from "../navigation/screens/NotFound";
import { Menu } from "../navigation/screens/AppMenu";
import { Pomodoro } from "../navigation/screens/Pomodoro";
import { Kanban } from "../navigation/screens/Kanban";
import { Checklist } from "../navigation/screens/Checklist";
import { StickyNotes } from "../navigation/screens/StickyNotes";
import { Settings } from "../navigation/screens/Settings";
import { Icon } from "../components/ui/Icon";
import { MEIcons } from "../utils/functions/icon-mapping";
import { Dashboard } from "../navigation/screens/Dashboard";

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
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen name="Menu" component={Menu} />
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
      initialRouteName="Dashboard"
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
          if (route.name === "Dashboard") {
            iconName = "home";
          }

          return <Icon name={iconName!} />;
        },
      })}
    >
      <Tab.Screen
        name="Menu"
        options={{ headerShown: false }}
        component={Menu}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}
