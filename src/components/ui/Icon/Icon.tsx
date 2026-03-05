import { Image, ImageProps } from "react-native";
import { useThemeMode } from "../../../theme/ThemeContext";
import { MEIcons } from "./icon-mapping";
import { useEffect } from "react";
import { iconName } from "../../../utils/types/app-types";

interface IconProps extends Omit<ImageProps, "source"> {
  name: iconName;
}

export const Icon = ({ name, ...rest }: IconProps) => {
  const { mode } = useThemeMode();

  useEffect(() => {
    console.log(MEIcons[name][mode]);
  }, []);

  return <Image source={MEIcons[name][mode]} {...rest} />;
};
