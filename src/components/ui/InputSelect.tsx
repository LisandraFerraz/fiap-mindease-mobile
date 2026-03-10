import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { ReactNode, useMemo, useState } from "react";
import { ThemedText } from "../ThemedText";
import { Icon } from "./Icon";
import {
  GetKanbanPriority,
  GetKanbanStatus,
} from "../../utils/functions/get-kanban-keys";
import { InputTemplate, ITemplateProps } from "./InputTemplate";
import { stickyNoteColor } from "../../utils/types/app-types";
import { accentColorSelection } from "../../utils/data/default-colors";

type MESelect = "status" | "prioridade" | "color";

interface IOption {
  value: any; // kanbanStatus | kanbanPriority;
  label?: string;
  jsxElement?: ReactNode;
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
  const bgColors = useMemo(() => accentColorSelection(colors), [colors]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeOpt, setActiveOpt] = useState(selected);

  const handleSelecOption = (value: any) => {
    setActiveOpt(value);

    setSelectedOption(value);
    setIsOpen(false);
  };

  const parseActiveOption = () => {
    if (type === "status")
      return <ThemedText>{GetKanbanStatus(activeOpt)}</ThemedText>;
    if (type === "prioridade")
      return <ThemedText>{GetKanbanPriority(activeOpt)}</ThemedText>;
    if (type === "color")
      return (
        <View
          style={[
            styles.color_opt_circle,
            bgColors[selected as stickyNoteColor],
          ]}
        />
      );
  };

  return (
    <InputTemplate color={colors} label={label} required={required}>
      <TouchableOpacity
        style={[styles.select_input, isOpen ? undefined : styles.bottom_input]}
        onPress={() => setIsOpen(!isOpen)}
      >
        {parseActiveOption()}
        <Icon name={isOpen ? "chevronDown" : "chevronLeft"} />
      </TouchableOpacity>

      <View style={styles.options_group}>
        {isOpen &&
          options.map(({ value, label, jsxElement }, index) => (
            <>
              {activeOpt !== value && (
                <TouchableOpacity
                  style={[
                    styles.select_option,
                    index + 1 === options.length
                      ? styles.bottom_input
                      : undefined,
                  ]}
                  key={index}
                  onPress={() => handleSelecOption(value)}
                >
                  {label ? (
                    // Recebe label = é seleção de texto //
                    <ThemedText type="defaultThin">{label}</ThemedText>
                  ) : (
                    // Recebe jsxElement = é color pick //
                    <>{jsxElement}</>
                  )}
                </TouchableOpacity>
              )}
            </>
          ))}
      </View>
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
    options_group: {
      width: "100%",
      position: "absolute",
      top: 50,
      zIndex: 10,
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

    color_opt_circle: {
      borderRadius: 100,
      width: 20,
      height: 20,
    },
    BLUE: {
      borderTopColor: color.color_accent_blue,
    },

    YELLOW: {
      borderTopColor: color.color_accent_yellow,
    },

    RED: {
      borderTopColor: color.color_accent_red,
    },

    GREEN: {
      borderTopColor: color.color_accent_green,
    },

    ORANGE: {
      borderTopColor: color.color_accent_orange,
    },
  });
