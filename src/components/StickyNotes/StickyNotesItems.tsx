import { useTheme } from "@react-navigation/native";
import { UseStikyNotes } from "../../utils/hooks/api-calls/useStickyNotes";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import InputText from "../ui/InputText";
import { Icon } from "../ui/Icon/Icon";
import {
  IStickyNotesResponse,
  StickyNote,
  StickyNotesGroup,
} from "../../utils/models/sticky-note-model";
import { StickyNoteItem } from "./StickyNote";
import uuid from "react-native-uuid";

interface INotesProps {
  notes: StickyNote[];
  activeGroup: StickyNotesGroup;
  onUpdateGroup: (res: IStickyNotesResponse) => void;
}

export const StickyNotesItems = ({
  notes,
  activeGroup,
  onUpdateGroup,
}: INotesProps) => {
  const { updateStickyNote, deleteStickyNote, addStickyNote } = UseStikyNotes();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const handleUpdateNote = (body: Partial<StickyNote>) => {
    updateStickyNote(activeGroup.id, body, body.id!).then(
      (res: IStickyNotesResponse) => onUpdateGroup(res),
    );
  };

  const handleAddNote = () => {
    const body = {
      id: uuid.v4(),
      color: "BLUE",
      description: "Sem descrição...",
      title: "Novo post-it",
    } as StickyNote;

    addStickyNote(activeGroup.id, body).then((res) => onUpdateGroup(res));
  };

  const handleDeleteNote = (id: string) => {
    deleteStickyNote(activeGroup.id, id).then((res) => onUpdateGroup(res));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.search_add_top}>
        <InputText maxLength={20} placeholder="Pesquisar anotação..." />
        <TouchableOpacity onPress={handleAddNote} style={styles.add_button}>
          <Icon name="add" style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.notes_group}>
        {notes.map((note) => (
          <StickyNoteItem
            key={note.id}
            noteData={note}
            updateStickyNote={(body) => handleUpdateNote(body)}
            deleteStickyNote={(id: string) => handleDeleteNote(id)}
          />
        ))}
      </View>
    </View>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    wrapper: {
      gap: 35,
    },
    search_add_top: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    notes_group: {
      flexDirection: "column",
      gap: 15,
    },
    add_button: {
      borderRadius: 100,
      backgroundColor: color.background,

      shadowColor: color.shadow_dark_grey_color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,

      //   width: 30,
      //   height: 30,
    },
  });
