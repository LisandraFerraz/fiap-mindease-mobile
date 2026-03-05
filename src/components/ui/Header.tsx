import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";
import { Badge } from "react-native-elements";
import UserDataStore from "../../stores/user-data-store";
import { ThemedText } from "../ThemedText";

export const Header = () => {
  const userInfo = UserDataStore((state) => state.userInfo);

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), [colors]);

  return (
    <>
      <View style={styles.container}>
        <ThemedText style={styles.header_text}>
          Olá {userInfo?.nome ?? "usuário"}
        </ThemedText>
        <Badge
          status="error"
          containerStyle={{ position: "absolute", top: 15, right: 20 }}
        />
        <Ionicons
          style={styles.notif_icon}
          onPress={() => alert("This is a button!")}
          name="notifications"
          size={25}
        />
      </View>
    </>
  );
};

const styleSheet = (color: any) =>
  StyleSheet.create({
    container: {
      // backgroundColor: color.sidenv_bg_color,
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      minHeight: 65,
    },
    header_text: {
      fontSize: 22,
      fontWeight: 500,
    },
    notif_icon: {
      color: color.text_color_dark,
    },
  });
