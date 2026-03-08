import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { ThemedText } from "../ThemedText";
import { Button } from "./Button";
import { Icon } from "./Icon";

export const ModalTemplate = ({
  children,
  modalTitle,
  isOpen,
  btnDisabled,
  btnShown,
  onClose,
  onBtnConfirm,
}: {
  modalTitle?: string;
  children: React.ReactNode;
  isOpen: boolean;
  btnDisabled?: boolean;
  btnShown?: boolean;
  onClose: () => void;
  onBtnConfirm?: () => void;
}) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <>
      {children && (
        <SafeAreaProvider>
          <SafeAreaView>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isOpen}
              onRequestClose={onClose}
            >
              <TouchableOpacity style={styles.centeredView} onPress={onClose}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalView}>
                    <View style={[styles.modalTop]}>
                      <ThemedText style={styles.modalText}>
                        {modalTitle ?? ""}
                      </ThemedText>
                      <Pressable onPress={onClose}>
                        <Text style={{ color: colors.text_color_dark }}>
                          <Icon name="close" />
                        </Text>
                      </Pressable>
                    </View>
                    {children}
                    {btnShown && onBtnConfirm && (
                      <View style={styles.modal_bottom}>
                        <Button
                          color="primary"
                          name="Confirmar"
                          onClick={onBtnConfirm}
                          disabled={btnDisabled}
                        />
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    centeredView: {
      flex: 1,
      backgroundColor: "#0000007c",
      justifyContent: "center",
      alignItems: "center",
    },
    modalTop: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    modalView: {
      width: "90%",
      position: "absolute",
      // borderTopRightRadius: 20,
      // borderTopLeftRadius: 20,
      borderRadius: 20,
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 1,
      padding: 20,
      // padding: 35,
      shadowColor: color.shadow_dark_grey_color,
      backgroundColor: color.background,
    },
    modalText: {
      fontWeight: "500",
      textTransform: "capitalize",
    },
    modal_bottom: {
      marginTop: 25,
    },
  });
