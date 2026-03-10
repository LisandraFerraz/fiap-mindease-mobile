import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "react-native-elements";
import UserDataStore from "../../stores/user-data-store";
import { ThemedText } from "../ThemedText";
import { NotificationsModal } from "../Notifications/NotificationsModal";
import { UseNotifications } from "../../utils/hooks/api-calls/useNotifications";
import { INotifResponse } from "../../utils/models/notification-model";
import { Icon } from "./Icon";
import { useThemeMode } from "../../theme/ThemeContext";
import { FormatDateName } from "../../utils/functions/get-today-date";

export const Header = ({ hasName = false }: { hasName?: boolean }) => {
  const userInfo = UserDataStore((state) => state.userInfo);
  const dateNow = new Date();

  const { getAllNotifications } = UseNotifications();

  const { toggleTheme } = useThemeMode();
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), [colors]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasNotifs, setHasNotifs] = useState<boolean>(false);

  useEffect(() => {
    handleListAllNotifs();
  }, []);

  const handleListAllNotifs = () => {
    getAllNotifications().then((res: INotifResponse) => {
      if (res) {
        setHasNotifs(
          res.checklistNotificacoes.length > 0 ||
            res.kanbanNotificacoes.length > 0,
        );
      }
    });
  };

  const handleCloseModal = () => {
    handleListAllNotifs();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ gap: 5 }}>
          {hasName && (
            <>
              <ThemedText style={styles.header_text}>
                Olá, {userInfo?.nome ?? "usuário"}
              </ThemedText>
              <ThemedText type="defaultThin">
                {FormatDateName(dateNow)}
              </ThemedText>
            </>
          )}
        </View>

        <View style={styles.header_opts_group}>
          <TouchableOpacity onPress={toggleTheme}>
            <Icon name="theme" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            {hasNotifs && (
              <Badge
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: 0,
                  right: 3,
                  zIndex: 10,
                }}
              />
            )}
            <Ionicons
              style={styles.notif_icon}
              name="notifications"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isOpen && (
        <NotificationsModal
          isOpen={isOpen}
          onClose={() => handleCloseModal()}
        />
      )}
    </>
  );
};

const styleSheet = (color: any) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 30,
    },
    header_opts_group: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    header_text: {
      fontSize: 22,
      fontWeight: 500,
    },
    notif_icon: {
      color: color.text_color_dark,
    },
  });
