import { PartialRoute, useTheme } from "@react-navigation/native";
import { StickyNote } from "../../utils/models/sticky-note-model";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import {
  accentColorSelection,
  bgStickyNotes,
} from "../../utils/data/default-colors";
import { stickyNoteColor } from "../../utils/types/app-types";
import { Icon } from "../ui/Icon";
import { ThemedText } from "../ThemedText";

interface INoteProps {
  noteData: StickyNote;
  updateStickyNote?: (body: Partial<StickyNote>) => void;
  deleteStickyNote?: (id: string) => void;
  style?: StyleProp<TextStyle>;
}

export const StickyNoteItem = ({
  deleteStickyNote,
  updateStickyNote,
  noteData,
  style,
}: INoteProps) => {
  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);
  const bgColors = useMemo(() => bgStickyNotes(colors), [colors]);

  const [noteName, setNoteName] = useState<string>(noteData.title);
  const [noteDescription, setNoteDescription] = useState<string>(
    noteData.description,
  );

  const handleUpdateNote = (
    fieldName: keyof StickyNote,
    value: string | boolean,
  ) => {
    const body = {
      id: noteData.id,
      [fieldName]: value,
    } as Partial<StickyNote>;

    if (updateStickyNote) updateStickyNote(body);
  };

  useEffect(() => {
    setNoteName(noteData.title);
    setNoteDescription(noteData.description);
  }, [noteData]);

  return (
    <View style={[styles.card, bgColors[noteData.color], style]}>
      <View style={styles.card_top}>
        <TextInput
          editable={deleteStickyNote ? true : false}
          value={noteName}
          onChangeText={(e) => setNoteName(e)}
          accessibilityHint="Alterar nome do grupo de post-its"
          onBlur={() => handleUpdateNote("title", noteName)}
          maxLength={25}
          style={[styles.note_title_input]}
        />
        {deleteStickyNote && (
          <View style={styles.postit_options}>
            <TouchableOpacity
              onPress={() =>
                handleUpdateNote("isFavorite", !noteData.isFavorite)
              }
            >
              <Icon
                name={noteData.isFavorite ? "filled_heart" : "empty_heart"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteStickyNote(noteData.id)}>
              <Icon name="close" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        <TextInput
          editable={deleteStickyNote ? true : false}
          multiline
          numberOfLines={Math.round(noteDescription.length / 30)}
          value={
            deleteStickyNote
              ? noteDescription
              : `${noteDescription.slice(0, 75)}...`
          }
          onChangeText={(e) => setNoteDescription(e)}
          accessibilityHint="Alterar nome do grupo de post-its"
          onBlur={() => handleUpdateNote("description", noteDescription)}
          maxLength={200}
          style={[styles.note_desc_input]}
        />
      </View>
      {deleteStickyNote && (
        <ThemedText style={{ alignSelf: "flex-end" }} type="defaultThin">
          {noteDescription.length}/200
        </ThemedText>
      )}
    </View>
  );
};

const stylesSheet = (colors: any) =>
  StyleSheet.create({
    card: {
      borderBottomWidth: 10,
      borderColor: "#5d5d5d74",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 15,
      gap: 10,
      height: "auto",
      maxHeight: 400,
    },
    card_top: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    note_title_input: {
      color: colors.text_color_dark,
      fontSize: 16,
      fontWeight: "500",
    },
    postit_options: {
      flexDirection: "row",
      gap: 10,
    },
    note_desc_input: {
      color: colors.text_color_light,
      fontSize: 15,
    },
    card_content: {},
  });
