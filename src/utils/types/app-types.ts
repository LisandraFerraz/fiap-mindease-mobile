import { MEIcons } from "../../components/ui/Icon/icon-mapping";

export type ThemeMode = "dark-mode" | "light-mode";

export type kanbanStatus = "BACKLOG" | "AFAZER" | "ANDAMENTO" | "CONCLUIDO";

export type stickyNoteColor = "BLUE" | "YELLOW" | "RED" | "GREEN" | "ORANGE";

export type AlertType = "EXPIRED" | "SOON" | "TODAY";

export type iconName = keyof typeof MEIcons;
