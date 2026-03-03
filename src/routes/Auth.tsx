import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "../navigation/screens/auth/pages/Auth";
import { SignUpPage } from "../navigation/screens/auth/pages/SignUp";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthPage"
        component={AuthPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
