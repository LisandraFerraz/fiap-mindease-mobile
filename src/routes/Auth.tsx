import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "../navigation/screens/auth/Auth";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthPage"
        component={AuthPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
