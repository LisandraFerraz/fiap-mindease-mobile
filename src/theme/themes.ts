import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { CustomTheme } from "./utils/theme-interface";

export const DarkTheme: CustomTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: "#0a0a12",
    bg_color_container: "#342d446e",
    bg_color_container_opacity: "#0a0a12d6",
    bg_color_dark: "#4f5162",

    bg_color_element_light: "#342d445c",
    bg_color_element_contrast: "#0f0f1a",
    bg_color_card: "#5b5b75",
    input_btn_color_primary: "#f6f6f6",

    sidenv_bg_color: "#0f0f1a",
    notification_color_exists: "#a61818",

    input_bg_color_primary: "#3f3f51",
    input_bg_color_bright: "#4e4e62",

    btn_bg_color_primary: "#2e379c",
    btn_bg_color_secondary: "#262630",
    btn_bg_color_primary_light: "#414aaf",
    btn_bg_color_active: "#3f3f51",

    color_sky_blue: "#b7d3f2",
    color_dark_blue: "#2f64c7",
    color_baby_blue: "#4967b873",
    color_dark_green: "#0f5310",
    color_light_green: "#116225b2",
    color_dark_yellow: "#81730c",
    color_light_yellow: "#ece75fa4",
    color_dark_red: "#4c1818",
    color_light_red: "#4c1818cd",
    color_light_orange: "#7a462bcd",

    tag_bg_color_green: "#44b115fb",
    tag_text_color_green: "#202821",
    tag_bg_color_yellow: "#bcbf0e",
    tag_text_color_yellow: "#080805a4",
    tag_bg_color_red: "#b02020",
    tag_text_color_red: "#f7f5f5",

    color_accent_blue: "#173251",
    color_accent_yellow: "#ffeaa4",
    color_accent_red: "#f1b9b9",
    color_accent_green: "#6db375",
    color_accent_orange: "#f3af81",

    text_color_dark: "#ffffff",
    text_color_light: "#e7e5e5",
    text_color_opacity: "#b1b1b1",
    text_color_error: "#f53232",

    shadow_grey_color: "#464283",
    shadow_dark_grey_color: "#4f5162",
    shadow_dark_blue_color: "#3d3a65",

    border_color: "#4f5162",
  },
};

export const LightTheme: CustomTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: "#ffffff",
    bg_color_container: "#fdfcfc",
    bg_color_container_opacity: "#ffffffc1",
    bg_color_dark: "#4f5162",

    bg_color_element_light: "#ffffff",
    bg_color_element_contrast: "#fff5f5",
    bg_color_card: "#ffffff",

    sidenv_bg_color: "#ffffff",
    notification_color_exists: "#a61818",

    btn_bg_color_primary: "#4f5162",
    btn_bg_color_secondary: "#f1f1f1",

    input_bg_color_bright: "#4e4e62",
    btn_bg_color_primary_light: "#414aaf",
    input_btn_color_primary: "#f6f6f6",

    input_bg_color_primary: "#f6f6f6",
    btn_bg_color_active: "#e8f0ff",

    tag_bg_color_green: "#e1f7dd",
    tag_text_color_green: "#0f5310",
    tag_bg_color_yellow: "#f7f4dd",
    tag_text_color_yellow: "#81730c",
    tag_bg_color_red: "#f7e0dd",
    tag_text_color_red: "#4c1818",

    color_sky_blue: "#b7d3f2",
    color_baby_blue: "#e8f0ff",
    color_dark_blue: "#2f64c7",
    color_dark_green: "#0f5310",
    color_light_green: "#e1f7dd",
    color_dark_yellow: "#81730c",
    color_light_yellow: "#f7f4dd",
    color_dark_red: "#4c1818",
    color_light_red: "#f7e0dd",
    color_light_orange: "#fbd6be",

    color_accent_blue: "#b7d3f2",
    color_accent_yellow: "#ffeaa4",
    color_accent_red: "#f1b9b9",
    color_accent_green: "#6db375",
    color_accent_orange: "#f3af81",

    text_color_dark: "#4f5162",
    text_color_light: "#888990",
    text_color_opacity: "#cdcdcd",
    text_color_error: "#a61818",

    shadow_grey_color: "#cdcdcd",
    shadow_dark_grey_color: "#4f5162",
    shadow_dark_blue_color: "#2f64c7",

    border_color: "#a7a7a74b",
  },
};
