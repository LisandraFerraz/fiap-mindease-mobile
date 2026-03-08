import { useTheme } from "@react-navigation/native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import {
  ChecklistItem,
  ChecklistModel,
  IChecklistResponse,
} from "../../utils/models/checklist-model";
import { UseChecklist } from "../../utils/hooks/api-calls/useChecklist";
import { InputSelect } from "../ui/InputSelect";
import { stickyNoteColor } from "../../utils/types/app-types";
import {
  accentColorSelection,
  borderColorsSelection,
} from "../../navigation/screens/utils/data/default-colors";
import { InputAddTask } from "../ui/InputAddTask";
import uuid from "react-native-uuid";
import { TodoCard } from "../ui/TodoCard";
import { Icon } from "../ui/Icon";

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
  const bgColors = useMemo(() => accentColorSelection(colors), [colors]);

  const [checklistName, setChecklistName] = useState<string>(
    activeChecklist.name,
  );
  const [checklistColor, setChecklistColor] = useState(activeChecklist.color);
  const [newTask, setNewTask] = useState<string>("");

  // Cria, atualiza e deleta tarefa //
  const handleCreateTask = () => {
    const body = {
      completed: false,
      description: newTask,
      id: uuid.v4(),
      lastUpdated: new Date(),
    } as ChecklistItem;

    setNewTask("");
    addChecklistItem(activeChecklist.id, body).then((res) => onUpdate(res));
  };

  const handleDeleteTask = (id: string) => {
    deletaChecklistItem(activeChecklist.id, id).then((res) => onUpdate(res));
  };

  const handleUpdateTask = (item: ChecklistItem) => {
    const body: ChecklistItem = {
      ...item,
      completed: !item.completed,
      lastUpdated: new Date(),
    };

    atualizaChecklistItem(activeChecklist.id, body).then((res) =>
      onUpdate(res),
    );
  };

  // Atualiza nome e cor da checklist //
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
    <>
      {activeChecklist && (
        <View style={[styles.items_group, borderColors[activeChecklist.color]]}>
          <View style={styles.group_top}>
            <View style={styles.group_name_edit}>
              <Icon name="edit" />
              <TextInput
                value={activeChecklist.name}
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

          <InputAddTask
            valueChange={(e) => setNewTask(e)}
            placeholder="Criar tarefa..."
            value={newTask}
            addTask={handleCreateTask}
          />

          <View style={styles.tasks_group}>
            {activeChecklist.data.map((item, index) => (
              <TodoCard
                key={index}
                deleteItem={() => handleDeleteTask(item.id)}
                markAs={() => handleUpdateTask(item)}
                description={item.description}
                isCompleted={item.completed}
              />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    items_group: {
      backgroundColor: color.bg_color_container,
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 15,
      gap: 25,

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

    tasks_group: {
      gap: 10,
    },
  });
