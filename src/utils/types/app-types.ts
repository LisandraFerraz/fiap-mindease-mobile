import { MEAssets } from "../functions/assets-mapping";
import { MEIcons } from "../functions/icon-mapping";

export type kanbanStatus = "BACKLOG" | "AFAZER" | "ANDAMENTO" | "CONCLUIDO";

export type stickyNoteColor = "BLUE" | "YELLOW" | "RED" | "GREEN" | "ORANGE";

export type AlertType = "EXPIRED" | "SOON" | "TODAY";

export type iconName = keyof typeof MEIcons;

export type assetName = keyof typeof MEAssets;

export type FontSizeMode = "default-text" | "sm-text" | "lg-text" | "xl-text";
