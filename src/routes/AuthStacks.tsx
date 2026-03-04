import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../navigation/screens/auth/pages/Login";
import { SignUpPage } from "../navigation/screens/auth/pages/SignUp";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
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
