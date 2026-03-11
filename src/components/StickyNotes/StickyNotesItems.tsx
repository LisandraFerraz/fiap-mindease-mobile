import { useTheme } from "@react-navigation/native";
import { UseStikyNotes } from "../../utils/hooks/api-calls/useStickyNotes";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useMemo, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import InputText from "../ui/InputText";
import { Icon } from "../ui/Icon";
import {
  FilterStickyNotes,
  IStickyNotesResponse,
  StickyNote,
  StickyNotesGroup,
} from "../../utils/models/sticky-note-model";
import { StickyNoteItem } from "./StickyNote";
import uuid from "react-native-uuid";
import { Asset } from "../ui/Assets";

interface INotesProps {
  notes: StickyNote[];
  activeGroup: StickyNotesGroup;
  onUpdateGroup: (res: IStickyNotesResponse) => void;
  onUpdateActiveGroup: (res: any) => void;
}

export const StickyNotesItems = ({
  notes,
  activeGroup,
  onUpdateGroup,
  onUpdateActiveGroup,
}: INotesProps) => {
  const {
    updateStickyNote,
    deleteStickyNote,
    addStickyNote,
    filterStickyNotesGroup,
  } = UseStikyNotes();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const [searchBody, setSearchBody] = useState<FilterStickyNotes>(
    new FilterStickyNotes(),
  );
  const [isSearchUp, setIsSearchUp] = useState<boolean>(false);

  const handleFilterGroup = (filterBody: FilterStickyNotes = searchBody) => {
    filterStickyNotesGroup(filterBody, activeGroup.id).then((res: any) => {
      onUpdateActiveGroup(res.stickyNotes);
      setIsSearchUp(filterBody.search !== "");
    });
  };

  const handleUpdateNote = (body: Partial<StickyNote>) => {
    updateStickyNote(activeGroup.id, body, body.id!).then(
      (res: IStickyNotesResponse) => {
        onUpdateGroup(res);
      },
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

  const handleUpdateSearchBody = (value: string) => {
    if (value !== "") {
      setSearchBody({ search: value });
    } else {
      const resetBody = new FilterStickyNotes();
      setSearchBody(resetBody);
      handleFilterGroup(resetBody);
    }
  };

  const handleResetFilter = () => {
    const resetBody = new FilterStickyNotes();
    setSearchBody(resetBody);
    handleFilterGroup(resetBody);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.search_add_top}>
        <View style={styles.search_input_group}>
          <InputText
            onChange={(e: string) => handleUpdateSearchBody(e)}
            maxLength={20}
            value={searchBody.search}
            placeholder="Pesquisar anotação..."
          />
          <View style={styles.btn_group}>
            {isSearchUp ? (
              <TouchableOpacity
                style={styles.search_input_btn}
                onPress={handleResetFilter}
              >
                <Icon name="restart" />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={styles.search_input_btn}
              onPress={() => handleFilterGroup()}
            >
              <Icon name="search" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleAddNote} style={styles.add_button}>
          <Icon name="add" style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.notes_group}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <StickyNoteItem
              key={note.id}
              noteData={note}
              updateStickyNote={(body) => handleUpdateNote(body)}
              deleteStickyNote={(id: string) => handleDeleteNote(id)}
            />
          ))
        ) : (
          <>
            <Asset
              style={{
                alignSelf: "center",
                width: 185,
                height: 55,
              }}
              name="empty_todo_list"
            />
          </>
        )}
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
    search_input_group: {
      position: "relative",
      width: "90%",
    },
    btn_group: {
      position: "absolute",
      right: 15,
      top: "25%",
      gap: 10,
      flexDirection: "row",
    },
    search_input_btn: {},
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
