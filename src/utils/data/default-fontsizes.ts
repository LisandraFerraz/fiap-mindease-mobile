import { FontTokens } from "../models/fontsize-tokens";
import { FontSizeMode } from "../types/app-types";

export const fontScale: Record<FontSizeMode, FontTokens> = {
  "default-text": {
    size_title: 20,
    size_text: 17,
    size_description: 14,
    size_label: 12,
  },
  "sm-text": {
    size_title: 16,
    size_text: 12,
    size_description: 10,
    size_label: 8,
  },
  "lg-text": {
    size_title: 22,
    size_text: 18,
    size_description: 16,
    size_label: 14,
  },
  "xl-text": {
    size_title: 24,
    size_text: 20,
    size_description: 18,
    size_label: 16,
  },
};
