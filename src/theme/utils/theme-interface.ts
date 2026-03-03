// theme/types.ts
import { Theme } from "@react-navigation/native";

export interface CustomTheme extends Theme {
  colors: Theme["colors"] & {
    background: string;
    bg_color_container: string;
    bg_color_container_opacity: string;
    bg_color_dark: string;

    bg_color_element_light: string;
    bg_color_element_contrast: string;
    bg_color_card: string;

    sidenv_bg_color: string;
    notification_color_exists: string;

    input_bg_color_primary: string;
    input_bg_color_bright: string;
    input_btn_color_primary: string;

    btn_bg_color_primary: string;
    btn_bg_color_secondary: string;
    btn_bg_color_primary_light: string;
    btn_bg_color_active: string;

    color_sky_blue: string;
    color_dark_blue: string;
    color_baby_blue: string;
    color_dark_green: string;
    color_light_green: string;
    color_dark_yellow: string;
    color_light_yellow: string;
    color_dark_red: string;
    color_light_red: string;
    color_light_orange: string;

    tag_bg_color_green: string;
    tag_text_color_green: string;
    tag_bg_color_yellow: string;
    tag_text_color_yellow: string;
    tag_bg_color_red: string;
    tag_text_color_red: string;

    color_accent_blue: string;
    color_accent_yellow: string;
    color_accent_red: string;
    color_accent_green: string;
    color_accent_orange: string;

    text_color_dark: string;
    text_color_light: string;
    text_color_opacity: string;
    text_color_error: string;

    shadow_grey_color: string;
    shadow_dark_grey_color: string;
    shadow_dark_blue_color: string;

    border_color: string;
  };
}
