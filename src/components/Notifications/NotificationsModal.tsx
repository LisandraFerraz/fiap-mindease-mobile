import { act, useEffect, useMemo, useState } from "react";
import { UseNotifications } from "../../utils/hooks/api-calls/useNotifications";
import { ModalTemplate } from "../ui/ModalTemplate";
import {
  INotification,
  INotifResponse,
} from "../../utils/models/notification-model";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useTheme } from "@react-navigation/native";
import { ThemedText } from "../ThemedText";
import { NotificationCard } from "./NotificationCard";
import { Asset } from "../ui/Assets";

interface INotifModalProps {
  isOpen: boolean;
  notifData: INotifResponse;
  onClose: () => void;
}

export const NotificationsModal = ({
  isOpen,
  notifData,
  onClose,
}: INotifModalProps) => {
  const { markAllAsRead, markOneAsRead } = UseNotifications();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => styleSheet(colors), [colors]);

  // const [allNotifs, setAllNotifs] = useState<INotifResponse>(notifData);
  const [kanbanNotifis, setKanbanNotifis] = useState<INotification[]>([]);
  const [checklistNotifis, setChecklistNotifis] = useState<INotification[]>([]);
  const [activeTab, setActiveTab] = useState<INotification[]>([]);
  // const [isKanbanActive, setIsKanbanActive] = useState<boolean>(true);

  useEffect(() => {
    // setAllNotifs(notifData);
    handleSetNotifications(notifData);
    handleSetActiveTab();
    // setActiveTab(notifData.kanbanNotificacoes);
  }, [kanbanNotifis]);

  const handleSetNotifications = (data: INotifResponse) => {
    setChecklistNotifis(data.checklistNotificacoes);
    setKanbanNotifis(data.kanbanNotificacoes);

    handleSetActiveTab();
  };

  const handleSetActiveTab = () => {
    if (kanbanNotifis?.length > 0) {
      setActiveTab(kanbanNotifis);
      console.log("kanbanNotifis: ", kanbanNotifis);
    } else {
      setActiveTab(
        checklistNotifis?.length > 0 ? checklistNotifis : kanbanNotifis,
      );
    }
  };

  // const handleChangeLayout = () => {
  //   setIsKanbanActive(!isKanbanActive);
  // };

  const handleMarkOneAsRead = (id: string) => {
    markOneAsRead(id).then((res) => handleSetNotifications(res));
  };

  const handleMarkAllAsRead = () => {
    const ids = activeTab.map((nt) => nt.id);
    markAllAsRead(ids).then((res) => {
      handleSetNotifications(res);
      handleSetActiveTab();
    });
  };

  const getTabs = [
    {
      tabName: "Kanban",
      isActive: kanbanNotifis?.length === activeTab?.length,
      hasItems: kanbanNotifis?.length > 0,
      items: kanbanNotifis,
    },
    {
      tabName: "Checklist",
      isActive: checklistNotifis?.length === activeTab?.length,
      hasItems: checklistNotifis?.length > 0,
      items: checklistNotifis,
    },
  ];

  return (
    <>
      <ModalTemplate btnShown={false} isOpen={isOpen} onClose={onClose}>
        {activeTab && activeTab.length > 0 ? (
          <View style={{ gap: 25 }}>
            <View style={styles.tabs_group}>
              {getTabs.map((tab) => (
                <>
                  {tab.hasItems && (
                    <TouchableOpacity
                      key={tab.tabName}
                      onPress={() => {
                        setActiveTab(tab.items);
                        // handleChangeLayout();
                        console.log("tab.items:", getTabs);
                      }}
                      style={[
                        styles.tab_btn,
                        tab.isActive ? styles.activeTab : undefined,
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.tab_btn_text,
                          tab.isActive ? styles.activeTab_text : undefined,
                        ]}
                      >
                        {tab.tabName}
                      </ThemedText>
                    </TouchableOpacity>
                  )}
                </>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleMarkAllAsRead}
              style={{ alignSelf: "flex-end" }}
            >
              <ThemedText type="link">
                Marcar todos como lidos {activeTab.length}
              </ThemedText>
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.card_group}>
                {activeTab &&
                  activeTab.map((notif: INotification) => (
                    <NotificationCard
                      key={notif.id}
                      data={notif}
                      onReadOne={() => handleMarkOneAsRead(notif.id)}
                    />
                  ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <Asset style={styles.empty_list} name="notification_empty" />
          </View>
        )}
      </ModalTemplate>
    </>
  );
};

const styleSheet = (colors: any) =>
  StyleSheet.create({
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
    activeTab_text: {
      color: colors.text_color_dark,
    },
    activeTab: {
      backgroundColor: colors.btn_bg_color_active,
    },
    card_group: {
      gap: 15,
      maxHeight: 400,
      padding: 5,
    },
    empty_list: {
      alignSelf: "center",
      width: 150,
      height: 150,
      marginBottom: 45,
    },
  });
