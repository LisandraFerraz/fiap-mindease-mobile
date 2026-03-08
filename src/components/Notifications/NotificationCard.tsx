import { useTheme } from "@react-navigation/native";
import { INotification } from "../../utils/models/notification-model";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { iconName } from "../../utils/types/app-types";
import { Icon } from "react-native-elements";

interface ICardProps {
  data: INotification;
  onReadOne: () => void;
}

export const NotificationCard = ({ data, onReadOne }: ICardProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), [colors]);

  const getIcon = (): iconName => {
    let icon = "";
    switch (data.alertType) {
      case "EXPIRED":
        icon = "assignment_late";
        break;
      case "SOON":
        icon = "schedule";
        break;
      case "TODAY":
        icon = "today";

        break;

      default:
        break;
    }
    return icon as iconName;
  };

  return (
    <View style={styles.card}>
      <View style={[styles.card_top, { justifyContent: "space-between" }]}>
        <View style={styles.card_top}>
          <Icon name={getIcon()} />
          <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
            {data.title}
          </ThemedText>
        </View>
        <TouchableOpacity>
          <Icon name="arrow_right" style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.card_desc}>{data.description}</ThemedText>
      <TouchableOpacity onPress={onReadOne}>
        <ThemedText type="link">Marcar como lido</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styleSheet = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: 15,
      padding: 20,
      backgroundColor: colors.bg_color_card,

      shadowColor: colors.border_color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      gap: 10,
    },
    card_top: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    card_desc: {
      color: colors.text_color_opacity,
    },
  });
