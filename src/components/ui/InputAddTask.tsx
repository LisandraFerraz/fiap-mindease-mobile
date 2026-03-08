import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "./Icon";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";

interface IInputAddTask {
  value: string;
  placeholder: string;
  addTask: () => void;
  valueChange: (value: string) => void;
}

export const InputAddTask = ({
  value,
  placeholder,
  addTask,
  valueChange,
}: IInputAddTask) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  return (
    <View>
      <TextInput
        onChange={(e) => valueChange(e.nativeEvent.text)}
        style={styles.text_input}
        maxLength={30}
        placeholder={placeholder}
        placeholderTextColor={colors.text_color_light}
      />
      {value.length >= 6 && (
        <TouchableOpacity onPress={addTask}>
          <Icon style={styles.input_icon} name="add_circle" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    input_icon: {
      height: 25,
      width: 25,
      position: "absolute",
      top: -35,
      right: 10,
    },
    text_input: {
      color: color.text_color_dark,
      backgroundColor: color.input_bg_color_primary,
      borderRadius: 10,
      elevation: 1,
      height: 50,
      fontSize: 16,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: color.border_color,
      paddingRight: 45,
    },
  });
