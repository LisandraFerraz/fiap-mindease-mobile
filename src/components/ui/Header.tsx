import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "react-native-elements";
import UserDataStore from "../../stores/user-data-store";
import { ThemedText } from "../ThemedText";
import { ModalTemplate } from "./ModalTemplate";
import { NotificationsModal } from "../Notifications/NotificationsModal";
import { UseNotifications } from "../../utils/hooks/api-calls/useNotifications";
import { INotifResponse } from "../../utils/models/notification-model";

export const Header = () => {
  const userInfo = UserDataStore((state) => state.userInfo);

  const { getAllNotifications } = UseNotifications();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), [colors]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasNotifs, setHasNotifs] = useState<boolean>(false);
  const [modalData, setModalData] = useState<INotifResponse>({
    checklistNotificacoes: [],
    kanbanNotificacoes: [],
  });

  useEffect(() => {
    handleListAllNotifs();
  }, []);

  const handleListAllNotifs = () => {
    getAllNotifications().then((res: INotifResponse) => {
      if (res) {
        setModalData(res);
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
        <ThemedText style={styles.header_text}>
          Olá {userInfo?.nome ?? "usuário"}
        </ThemedText>
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
          <Ionicons style={styles.notif_icon} name="notifications" size={25} />
        </TouchableOpacity>
      </View>

      {modalData && isOpen && (
        <NotificationsModal
          notifData={modalData}
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
