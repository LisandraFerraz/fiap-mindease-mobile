import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import { ThemedText } from "../../components/ThemedText";
import {
  IPreferenciasOptions,
  PreferenciasOptions,
} from "../../utils/data/settings";
import { SettingsInterface } from "../../components/Settings/SettingsInterface";
import { SettingsConta } from "../../components/Settings/SettingsConta";

export function Settings() {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), []);

  const [activeLayout, setActiveLayout] = useState<
    "interface-option" | "conta-option"
  >("interface-option");

  const preferenciasConteudo: IPreferenciasOptions[] = PreferenciasOptions;

  const RenderLayout = () => {
    if (activeLayout === "interface-option") {
      return <SettingsInterface data={preferenciasConteudo[0]} />;
    } else {
      return <SettingsConta data={preferenciasConteudo[1]} />;
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Configurações do aplicativo</ThemedText>

      <View style={styles.tabs_group}>
        {preferenciasConteudo.map((options) => (
          <TouchableOpacity
            onPress={() => setActiveLayout(options.component)}
            key={options.id}
            style={[
              styles.tab_btn,
              options.component === activeLayout ? styles.activeTab : undefined,
            ]}
          >
            <ThemedText
              style={[
                styles.tab_btn_text,
                options.component === activeLayout
                  ? styles.activeTab_text
                  : undefined,
              ]}
            >
              {options.navTitle}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      <RenderLayout />
    </View>
  );
}

const stylesSheet = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 25,
      padding: 25,
    },
    tabs_group: {
      flexDirection: "row",
      gap: 15,
      padding: 5,
    },
    tab_btn: {
      width: 120,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: colors.background,

      shadowColor: colors.shadow_grey_color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 8,
    },
    tab_btn_text: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text_color_opacity,
    },
    activeTab: {
      backgroundColor: colors.btn_bg_color_active,
    },

    activeTab_text: {
      color: colors.text_color_dark,
    },
  });
