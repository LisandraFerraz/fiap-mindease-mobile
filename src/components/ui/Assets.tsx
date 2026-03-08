import { Image, ImageProps } from "react-native";
import { assetName } from "../../utils/types/app-types";
import { useThemeMode } from "../../theme/ThemeContext";
import { MEAssets } from "../../utils/functions/assets-mapping";

interface IAssetProps extends Omit<ImageProps, "source"> {
  name: assetName;
}

export const Asset = ({ name, ...rest }: IAssetProps) => {
  const { mode } = useThemeMode();

  return <Image source={MEAssets[name][mode]} {...rest} />;
};
