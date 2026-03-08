import { SafeAreaProviderCompat } from "@react-navigation/elements";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/ui/Button";
import { ThemedText } from "../../../components/ThemedText";
import { ReactNode, useMemo } from "react";
import { useNavigation } from "expo-router";
import { useThemeMode } from "../../../theme/ThemeContext";
import { CustomTheme } from "../../../theme/utils/theme-interface";
import { useTheme } from "@react-navigation/native";

import dark_bg from "./../../../assets/static-assets/dark/dark-auth-bg.png";
import light_bg from "./../../../assets/static-assets/light/light-auth-bg.png";
import { Asset } from "../../../components/ui/Assets";

interface AuthTemplate {
  children: ReactNode;
  handleClick: () => void;
  body: any;
  navigateTo: string;
  linkName: string;
  btnDisabled: boolean;
}

export const AuthTemplate = ({
  children,
  handleClick,
  navigateTo,
  linkName,
  btnDisabled,
}: AuthTemplate) => {
  const navigation = useNavigation();
  const { mode } = useThemeMode();
  const { colors } = useTheme() as CustomTheme;

  const styles = useMemo(() => stylesSheet(colors), [colors]);
  const img = mode === "dark" ? dark_bg : light_bg;

  return (
    <SafeAreaProviderCompat>
      <SafeAreaView style={[styles.wrapper]}>
        <ImageBackground source={img} resizeMode="cover" style={styles.image}>
          <ScrollView>
            <View style={styles.container}>
              <Asset name="me_icon" style={[styles.icon]} />
              <View style={styles.form_container}>
                {children}

                <View style={styles.bottom}>
                  <Button
                    name="Confirmar"
                    onClick={handleClick}
                    disabled={btnDisabled}
                  />
                  <ThemedText
                    onPress={() => navigation.navigate(navigateTo)}
                    style={styles.link}
                    type="link"
                  >
                    {linkName}
                  </ThemedText>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProviderCompat>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      gap: 15,
      paddingTop: "10%",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    icon: {
      height: 200,
      width: 200,
    },
    form_container: {
      gap: 20,
      width: "90%",
      paddingHorizontal: 20,
      paddingVertical: 50,
      borderRadius: 10,
      backgroundColor: color.bg_color_container_opacity,
    },
    bottom: {
      marginTop: 15,
      textAlign: "center",
    },
    link: {
      marginTop: 15,
      alignSelf: "center",
    },
    image: {
      flex: 1,
      width: "100%",
      height: "99%",
    },
  });
