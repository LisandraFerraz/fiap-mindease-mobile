import { PartialRoute, useTheme } from "@react-navigation/native";
import { StickyNote } from "../../utils/models/sticky-note-model";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  accentColorSelection,
  bgStickyNotes,
} from "../../utils/data/default-colors";
import { stickyNoteColor } from "../../utils/types/app-types";
import { Icon } from "../ui/Icon";

interface INoteProps {
  noteData: StickyNote;
  updateStickyNote: (body: Partial<StickyNote>) => void;
  deleteStickyNote: (id: string) => void;
}

export const StickyNoteItem = ({
  deleteStickyNote,
  updateStickyNote,
  noteData,
}: INoteProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);
  const bgColors = useMemo(() => bgStickyNotes(colors), [colors]);

  const [noteName, setNoteName] = useState<string>(noteData.title);
  const [noteDescription, setNoteDescription] = useState<string>(
    noteData.description,
  );

  const handleUpdateNote = (fieldName: keyof StickyNote, value: string) => {
    const body = {
      id: noteData.id,
      [fieldName]: value,
    } as Partial<StickyNote>;

    updateStickyNote(body);
  };

  useEffect(() => {
    setNoteName(noteData.title);
    setNoteDescription(noteData.description);
  }, [noteData]);

  return (
    <View style={[styles.card, bgColors[noteData.color]]}>
      <View style={styles.card_top}>
        <TextInput
          value={noteName}
          onChangeText={(e) => setNoteName(e)}
          accessibilityHint="Alterar nome do grupo de post-its"
          onBlur={() => handleUpdateNote("title", noteName)}
          maxLength={25}
          style={[styles.note_title_input]}
        />
        <TouchableOpacity onPress={() => deleteStickyNote(noteData.id)}>
          <Icon name="close" />
        </TouchableOpacity>
      </View>
      <View style={styles.card_content}>
        <TextInput
          multiline
          numberOfLines={Math.round(noteDescription.length / 33)}
          value={noteDescription}
          onChangeText={(e) => setNoteDescription(e)}
          accessibilityHint="Alterar nome do grupo de post-its"
          onBlur={() => handleUpdateNote("description", noteDescription)}
          maxLength={200}
          style={[styles.note_desc_input]}
        />
      </View>
    </View>
  );
};

const stylesSheet = (colors: any) =>
  StyleSheet.create({
    card: {
      paddingHorizontal: 30,
      paddingVertical: 20,
      borderTopWidth: 10,
      borderRadius: 15,
      borderColor: "#5d5d5d74",
      gap: 10,
      height: "auto",
      maxHeight: 300,
    },
    card_top: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    note_title_input: {
      color: colors.text_color_dark,
      fontSize: 18,
      fontWeight: "500",
    },
    note_desc_input: {
      color: colors.text_color_light,
      fontSize: 16,
    },
    card_content: {},
  });
