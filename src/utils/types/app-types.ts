import { MEAssets } from "../functions/assets-config/assets-mapping";
import { MEIcons } from "../functions/Icon-config/icon-mapping";

export type ThemeMode = "dark-mode" | "light-mode";

export type kanbanStatus = "BACKLOG" | "AFAZER" | "ANDAMENTO" | "CONCLUIDO";

export type stickyNoteColor = "BLUE" | "YELLOW" | "RED" | "GREEN" | "ORANGE";

export type AlertType = "EXPIRED" | "SOON" | "TODAY";

export type iconName = keyof typeof MEIcons;

export type assetName = keyof typeof MEAssets;
