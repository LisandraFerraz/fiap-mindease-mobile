import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import { ThemedText } from "../ThemedText";
import { Icon } from "./Icon/Icon";
import {
  GetKanbanPriority,
  GetKanbanStatus,
} from "../../utils/functions/get-kanban-keys";
import { InputTemplate, ITemplateProps } from "./InputTemplate";

type MESelect = "status" | "prioridade";

interface IOption {
  value: any; // kanbanStatus | kanbanPriority;
  label: string;
}

interface ISelectProps extends Partial<ITemplateProps> {
  options: IOption[];
  selected: any; // kanbanStatus | kanbanPriority;
  type: MESelect;
  setSelectedOption: (option: string) => void;
}

export const InputSelect = ({
  options,
  selected,
  label,
  required,
  type,
  setSelectedOption,
}: ISelectProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeOpt, setActiveOpt] = useState(selected);

  const handleSelecOption = (value: any) => {
    setActiveOpt(value);
    setSelectedOption(value);
    setIsOpen(false);
  };

  const parseActiveOption = () => {
    if (type === "status") return GetKanbanStatus(activeOpt);
    if (type === "prioridade") return GetKanbanPriority(activeOpt);
  };

  return (
    <InputTemplate color={colors} label={label} required={required}>
      <TouchableOpacity
        style={[styles.select_input, isOpen ? undefined : styles.bottom_input]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <ThemedText type="default">{parseActiveOption()}</ThemedText>
        <Icon name={isOpen ? "chevronDown" : "chevronLeft"} />
      </TouchableOpacity>

      {isOpen &&
        options.map(({ value, label }, index) => (
          <TouchableOpacity
            style={[
              styles.select_option,
              index + 1 === options.length ? styles.bottom_input : undefined,
            ]}
            key={typeof value}
            onPress={() => handleSelecOption(value)}
          >
            <ThemedText type="thin">{label}</ThemedText>
          </TouchableOpacity>
        ))}
    </InputTemplate>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    label_row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
    },
    select_input: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: color.text_color_dark,
      backgroundColor: color.input_bg_color_primary,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      elevation: 1,
      height: 50,
      fontSize: 16,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: color.border_color,
    },
    bottom_input: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    select_option: {
      padding: 10,
      backgroundColor: color.input_bg_color_primary,
      borderWidth: 1,
      borderColor: color.border_color,
    },
    required: {
      color: color.text_color_opacity,
      fontSize: 12,
      textTransform: "uppercase",
    },
  });
