import { useEffect, useState } from "react";
import { UseStikyNotes } from "../../utils/hooks/api-calls/useStickyNotes";
import {
  IStickyNotesResponse,
  StickyNote,
  StickyNotesGroup,
} from "../../utils/models/sticky-note-model";
import { ScrollView, StyleSheet, View } from "react-native";
import { StickyNotesListing } from "../../components/StickyNotes/StickyNotesListing";
import { StickyNotesItems } from "../../components/StickyNotes/StickyNotesItems";

export const StickyNotes = () => {
  const { listAllStickyGroups } = UseStikyNotes();

  const [stickyNotesData, setStickyNotesData] = useState<StickyNotesGroup[]>();
  const [activeNotesGroup, setActiveNotesGroup] = useState<StickyNotesGroup>();

  useEffect(() => {
    listAllStickyNotes();
  }, []);

  const listAllStickyNotes = () => {
    listAllStickyGroups().then((res: IStickyNotesResponse) => {
      updateAllActiveNotesGroup(res);
    });
  };

  const updateAllActiveNotesGroup = (data: IStickyNotesResponse) => {
    const stickyNotes = data.stickyNotes;

    handleSetActiveNotesGroup(stickyNotes);
  };

  const handleSetActiveNotesGroup = (notes: StickyNotesGroup[]) => {
    setStickyNotesData(notes);

    if (activeNotesGroup) {
      const findActive = notes.find(
        (note) => note.id === activeNotesGroup.id,
      ) as any;

      setActiveNotesGroup(findActive ? findActive : notes[0]);
    } else {
      setActiveNotesGroup(notes[0]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {stickyNotesData && activeNotesGroup && (
        <View style={styles.wrapped}>
          <StickyNotesListing
            onUpdateGroup={(res: IStickyNotesResponse) =>
              updateAllActiveNotesGroup(res)
            }
            activeNotesGroup={activeNotesGroup}
            notesList={stickyNotesData}
            setActiveNotesGroup={(noteGroup: StickyNotesGroup) =>
              setActiveNotesGroup(noteGroup)
            }
          />

          <StickyNotesItems
            notes={activeNotesGroup.data}
            activeGroup={activeNotesGroup}
            onUpdateGroup={(res: IStickyNotesResponse) =>
              updateAllActiveNotesGroup(res)
            }
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  wrapped: {
    gap: 30,
  },
});
