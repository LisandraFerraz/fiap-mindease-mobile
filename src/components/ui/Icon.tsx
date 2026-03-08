import { Image, ImageProps } from "react-native";
import { useThemeMode } from "../../theme/ThemeContext";
import { iconName } from "../../utils/types/app-types";
import { MEIcons } from "../../utils/functions/icon-mapping";

interface IconProps extends Omit<ImageProps, "source"> {
  name: iconName;
}

export const Icon = ({ name, ...rest }: IconProps) => {
  const { mode } = useThemeMode();

  return <Image source={MEIcons[name][mode]} {...rest} />;
};
