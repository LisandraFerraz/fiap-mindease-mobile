import { Button, Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import UserDataStore from "../../stores/user-data-store";
import { useEffect } from "react";
import { UsePomodoro } from "../../utils/hooks/usePomodoro";

export function Home() {
  const { listPomodoroTasks } = UsePomodoro();

  useEffect(() => {
    listPomodoroTasks().then((res) => {
      console.log("Teste fetch ", res);
    });
  }, [listPomodoroTasks]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Profile" params={{ user: "jane" }}>
        Go to Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
