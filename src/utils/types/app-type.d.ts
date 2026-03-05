import { MEIcons } from "../../components/ui/Icon/icon-mapping";

declare type ThemeMode = "dark-mode" | "light-mode";

declare type kanbanStatus = "BACKLOG" | "AFAZER" | "ANDAMENTO" | "CONCLUIDO";

declare type stickyNoteColor = "BLUE" | "YELLOW" | "RED" | "GREEN" | "ORANGE";

declare type AlertType = "EXPIRED" | "SOON" | "TODAY";

declare type iconName = keyof typeof MEIcons;
