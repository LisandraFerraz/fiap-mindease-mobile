import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { InputTemplate, ITemplateProps } from "./InputTemplate";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import InputText from "./InputText";

interface IDatePickerProps extends Partial<ITemplateProps> {
  onPickDate: (value: Date) => void;
  date: Date;
}

export const InputDatePicker = ({
  onPickDate,
  label,
  required,
  date,
}: IDatePickerProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const parseDateToPT = (): string => {
    const parsed = date.toLocaleDateString("pt-PT");
    return `${parsed}`;
  };

  const [dateTyped, setDateTyped] = useState(parseDateToPT() ?? "");

  const handleChange = (text: string) => {
    const formatted = text
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    setDateTyped(formatted);

    if (formatted.length === 10) {
      parseDate(formatted);
    }
  };

  const parseDate = (date: string) => {
    const d = date.slice(0, 2);
    const m = date.slice(3, 5);
    const a = date.slice(6, 10);
    const newFormat = new Date(`${a}/${m}/${d}`);

    onPickDate(newFormat);
  };

  return (
    <View>
      <InputTemplate color={colors} label={label} required={required}>
        <InputText
          placeholder="DD/MM/AAAA"
          onChange={(e: any) => handleChange(e)}
          value={dateTyped}
          maxLength={10}
        />
      </InputTemplate>
    </View>
  );
};

const stylesSheet = (color: any) => StyleSheet.create({});
