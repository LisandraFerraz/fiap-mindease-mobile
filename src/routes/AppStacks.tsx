import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Profile } from "../navigation/screens/Profile";
import { NotFound } from "../navigation/screens/NotFound";
import { Home } from "../navigation/screens/Home";
import { Header } from "../components/ui/Header";

// const Stack = createNativeStackNavigator();

// export function AppStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Olá XXX"
//         options={{
//           headerRight: () => (
//             <Ionicons
//               onPress={() => alert("This is a button!")}
//               name="notifications"
//               size={25}
//             />
//           ),
//         }}
//         component={HomeTabs}
//       />
//       <Stack.Screen
//         options={{ headerShown: false }}
//         name="Profile"
//         component={Profile}
//       />
//       <Stack.Screen
//         name="Settings"
//         component={Settings}
//         options={{
//           presentation: "modal",
//         }}
//       />
//       <Stack.Screen name="NotFound" component={NotFound} />
//     </Stack.Navigator>
//   );
// }

//

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" "
        options={{ headerShown: false }}
        component={HomeTabs}
      />

      <Stack.Screen name="Olá, xxxx" component={Home} />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
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
        title: "",
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
        name="Menu"
        options={{ headerShown: false }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
