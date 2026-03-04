import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import UserDataStore from "../../stores/user-data-store";

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile() {
  return (
    <View style={styles.container}>
      <Text>'s Profile</Text>
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
