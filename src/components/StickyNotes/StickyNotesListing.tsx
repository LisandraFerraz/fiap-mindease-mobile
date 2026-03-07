import { useTheme } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import {
  IStickyNotesResponse,
  StickyNotesGroup,
} from "../../utils/models/sticky-note-model";
import { Icon } from "../ui/Icon/Icon";
import { UseStikyNotes } from "../../utils/hooks/api-calls/useStickyNotes";
import uuid from "react-native-uuid";

interface INotesGroupProps {
  notesList: StickyNotesGroup[];
  activeNotesGroup: StickyNotesGroup;
  setActiveNotesGroup: (notesGroup: StickyNotesGroup) => void;
  onUpdateGroup: (res: IStickyNotesResponse) => void;
}

export const StickyNotesListing = ({
  notesList,
  activeNotesGroup,
  setActiveNotesGroup,
  onUpdateGroup,
}: INotesGroupProps) => {
  const {
    updateStickyNotesGroup,
    createStickyNotesGroup,
    deleteStickyNotesGroup,
  } = UseStikyNotes();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const [groupName, setGroupName] = useState<string>(
    activeNotesGroup.groupName,
  );

  useEffect(() => {
    setGroupName(activeNotesGroup.groupName);
  }, [activeNotesGroup]);

  const handleUpdateNotesGroupName = (noteId: string) => {
    let body = {
      groupName: groupName,
    } as StickyNotesGroup;

    updateStickyNotesGroup(noteId, body).then((res: IStickyNotesResponse) =>
      onUpdateGroup(res),
    );
  };

  const handleCreateNotesGroup = () => {
    const body = {
      groupName: "Novo grupo",
      id: uuid.v4(),
      data: [],
    } as StickyNotesGroup;

    createStickyNotesGroup(body).then((res: IStickyNotesResponse) =>
      onUpdateGroup(res),
    );
  };

  const handleDeleteGroup = () => {
    deleteStickyNotesGroup(activeNotesGroup.id).then(
      (res: IStickyNotesResponse) => onUpdateGroup(res),
    );
  };

  return (
    <ScrollView horizontal>
      <View style={styles.notes_group_list}>
        {notesList.map((notesGroup: StickyNotesGroup) => (
          <TouchableOpacity
            key={notesGroup.id}
            onPress={() => setActiveNotesGroup(notesGroup)}
            style={styles.note_option}
          >
            {notesGroup.id === activeNotesGroup.id && (
              <TouchableOpacity onPress={handleDeleteGroup}>
                <Icon name="close" />
              </TouchableOpacity>
            )}

            <TextInput
              editable={activeNotesGroup.id === notesGroup.id}
              value={
                activeNotesGroup.id === notesGroup.id
                  ? groupName
                  : notesGroup.groupName
              }
              onChangeText={(e) => setGroupName(e)}
              accessibilityHint="Alterar nome do grupo de post-its"
              onBlur={() => handleUpdateNotesGroupName(notesGroup.id)}
              maxLength={10}
              style={[
                styles.note_name_input,

                activeNotesGroup.id === notesGroup.id
                  ? styles.active_option
                  : undefined,
              ]}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleCreateNotesGroup}>
          <Icon name="add" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    notes_group_list: {
      flexDirection: "row",
      paddingVertical: 15,
    },
    note_option: {
      flexDirection: "row",
      gap: 15,
    },
    note_name_input: {
      textDecorationLine: "underline",
      fontSize: 18,
      width: 120,
      outlineWidth: 0,
      borderWidth: 0,
      color: color.text_color_opacity,
    },
    active_option: {
      color: color.text_color_dark,
      fontWeight: "600",
    },
  });
