import { useEffect, useMemo, useState } from "react";
import {
  ChecklistModel,
  IChecklistResponse,
} from "../../utils/models/checklist-model";
import { UseChecklist } from "../../utils/hooks/api-calls/useChecklist";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { ChecklistItemCard } from "./ChecklistItemCard";
import { Icon } from "../ui/Icon";
import { ThemedText } from "../ThemedText";
import uuid from "react-native-uuid";

interface IListingProps {
  onUpdate: (response: IChecklistResponse) => void;
  setActive: (checklist: ChecklistModel) => void;
  checklistData: ChecklistModel[];
}

export const ChecklistListing = ({
  onUpdate,
  checklistData,
  setActive,
}: IListingProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const { createChecklist, deletaChecklist } = UseChecklist();

  const handleCreateChecklist = () => {
    const body = {
      id: uuid.v4(),
      color: "BLUE",
      name: `Checklist ${checklistData.length + 1}`,
      data: [],
    } as Partial<ChecklistModel>;

    createChecklist(body).then((res) => onUpdate(res));
  };

  const handleDeleteChecklist = (checklistId: string) => {
    deletaChecklist(checklistId).then((res) => onUpdate(res));
  };

  return (
    <View style={styles.checklist_list}>
      <View style={styles.checklist_top}>
        <TouchableOpacity onPress={handleCreateChecklist}>
          <Icon name="add" />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold">Adicionar checklist</ThemedText>
      </View>
      <ScrollView horizontal style={{ paddingVertical: 10 }}>
        {checklistData &&
          checklistData.map((cl: ChecklistModel) => (
            <ChecklistItemCard
              key={cl.id}
              setActive={() => setActive(cl)}
              onDelete={() => handleDeleteChecklist(cl.id)}
              data={cl}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    checklist_list: {
      backgroundColor: color.bg_color_container,
      paddingVertical: 30,
      paddingHorizontal: 25,
      borderRadius: 15,
      gap: 15,
    },
    checklist_top: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  });
