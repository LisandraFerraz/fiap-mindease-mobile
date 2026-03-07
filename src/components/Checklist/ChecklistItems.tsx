import { useTheme } from "@react-navigation/native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import {
  ChecklistItem,
  ChecklistModel,
  IChecklistResponse,
} from "../../utils/models/checklist-model";
import { UseChecklist } from "../../utils/hooks/api-calls/useChecklist";
import { Icon } from "../ui/Icon/Icon";
import { InputSelect } from "../ui/InputSelect";
import { stickyNoteColor } from "../../utils/types/app-types";
import {
  bgColorSelection,
  borderColorsSelection,
} from "../../navigation/screens/utils/data/default-colors";

interface ICheckItemsProps {
  activeChecklist: ChecklistModel;
  onUpdate: (response: IChecklistResponse) => void;
}

export const ChecklistItems = ({
  activeChecklist,
  onUpdate,
}: ICheckItemsProps) => {
  const {
    addChecklistItem,
    atualizaChecklist,
    deletaChecklistItem,
    atualizaChecklistItem,
  } = UseChecklist();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);
  const borderColors = useMemo(() => borderColorsSelection(colors), [colors]);
  const bgColors = useMemo(() => bgColorSelection(colors), [colors]);

  const [checklistName, setChecklistName] = useState<string>(
    activeChecklist.name,
  );
  const [checklistColor, setChecklistColor] = useState(activeChecklist.color);

  const handleUpdateChecklist = (field: string, value: any) => {
    const body = {
      [field]: value,
    } as Partial<ChecklistModel>;

    atualizaChecklist(activeChecklist.id, body).then(
      (res: IChecklistResponse) => onUpdate(res),
    );
  };

  const getColorsList = () => {
    const colors = ["BLUE", "YELLOW", "RED", "GREEN", "ORANGE"];
    return colors.map((color: any) => {
      return {
        jsxElement: (
          <>
            <View
              style={[
                styles.color_opt_circle,
                bgColors[color as stickyNoteColor],
              ]}
            />
          </>
        ),
        value: color,
      };
    });
  };

  return (
    <View style={[styles.items_group, borderColors[checklistColor]]}>
      <View style={styles.group_top}>
        <View style={styles.group_name_edit}>
          <Icon name="edit" />
          <TextInput
            value={checklistName}
            onChangeText={(e) =>
              e.length > 0 ? setChecklistName(e) : undefined
            }
            accessibilityHint="Alterar nome da checklist"
            style={styles.name_change_input}
            maxLength={20}
            onBlur={() => handleUpdateChecklist("name", checklistName)}
          />
        </View>
        <InputSelect
          selected={activeChecklist.color}
          options={getColorsList()}
          type="color"
          setSelectedOption={(option: any) => {
            handleUpdateChecklist("color", option);
            setChecklistColor(option);
          }}
        />
      </View>
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    items_group: {
      backgroundColor: color.bg_color_container,
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 15,
      gap: 15,

      borderTopWidth: 10,
    },
    group_top: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    group_name_edit: {
      flexDirection: "row",
      gap: 15,
    },
    name_change_input: {
      color: color.text_color_dark,
      fontSize: 16,
    },

    color_opt_circle: {
      borderRadius: 100,
      width: 20,
      height: 20,
    },
  });
