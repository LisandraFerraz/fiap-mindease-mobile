import { ImageBackground, StyleSheet, useColorScheme } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import dark_bg from "./../../../assets/dark-auth-bg.png";
import light_bg from "./../../../assets/light-auth-bg.png";
import { useTheme } from "@react-navigation/native";

export default function AuthPage() {
  const colorScheme = useColorScheme();
  const img = colorScheme === "dark" ? dark_bg : light_bg;
  const { colors } = useTheme() as any;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]} edges={["left", "right"]}>
        <ImageBackground source={img} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Inside</Text>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
    // padding: 0,
    // margin: 0,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
});
