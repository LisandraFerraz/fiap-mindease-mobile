import {
  Image,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";
import { UsuarioLogin } from "../../../utils/models/user-model";

import dark_bg from "./../../../assets/dark-auth-bg.png";
import light_bg from "./../../../assets/light-auth-bg.png";
import me_icon from "./../../../assets/me-icon.png";
import InputText from "../../../components/ui/InputText";
import { useThemeMode } from "../../../theme/ThemeContext";
import { useTheme } from "@react-navigation/native";
import Button from "../../../components/ui/Button";
import { isAuthFormValid } from "../../../utils/functions/validate-auth";
import { ThemedText } from "../../../components/ThemedText";
import { CustomTheme } from "../../../theme/utils/theme-interface";
import { useAuth } from "../../../core/context/AuthContext";

export default function AuthPage() {
  const { mode } = useThemeMode();
  const { colors } = useTheme() as CustomTheme;
  const { login } = useAuth();

  const styles = useMemo(() => stylesSheet(colors), [colors]);
  const img = mode === "dark" ? dark_bg : light_bg;

  const [loginBody, setLoginBody] = useState<UsuarioLogin>({
    email: "",
    password: "",
  });

  const prepareBody = (field: string, value: string) => {
    setLoginBody({
      ...loginBody,
      [field]: value,
    });
  };

  const handleLogin = () => {
    if (isAuthFormValid(loginBody)) {
      console.log(loginBody);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.wrapper]}>
        <ImageBackground source={img} resizeMode="cover" style={styles.image}>
          <View style={styles.container}>
            <Image source={me_icon} style={[styles.icon]} />
            <View style={styles.form_container}>
              <InputText
                label="e-mail"
                placeholder="seu@email.com"
                onChange={(e: any) => prepareBody("email", e)}
              />
              <InputText
                label="senha"
                placeholder="******"
                onChange={(e: any) => prepareBody("password", e)}
              />
              <View style={styles.bottom}>
                <Button
                  name="Confirmar"
                  onClick={() => login(loginBody)}
                  disabled={!isAuthFormValid(loginBody)}
                />
                <ThemedText style={styles.link} type="link">
                  Cadastre-se
                </ThemedText>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
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
    container: {
      flex: 1,
      gap: 25,
      paddingTop: "25%",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    image: {
      flex: 1,
      width: "100%",
      height: "99%",
    },
  });
