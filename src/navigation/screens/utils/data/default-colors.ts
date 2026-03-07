// Cores para color pick, bordas de elementos, post-it etc

import { StyleSheet } from "react-native";

export const borderColorsSelection = (color: any) =>
  StyleSheet.create({
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

export const bgColorSelection = (color: any) =>
  StyleSheet.create({
    BLUE: {
      backgroundColor: color.color_accent_blue,
    },

    YELLOW: {
      backgroundColor: color.color_accent_yellow,
    },

    RED: {
      backgroundColor: color.color_accent_red,
    },

    GREEN: {
      backgroundColor: color.color_accent_green,
    },

    ORANGE: {
      backgroundColor: color.color_accent_orange,
    },
  });
