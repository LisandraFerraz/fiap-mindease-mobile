import { StyleSheet, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ChecklistListing } from "../../components/Checklist/ChecklistListing";
import { useEffect, useState } from "react";
import { UseChecklist } from "../../utils/hooks/api-calls/useChecklist";
import {
  ChecklistModel,
  IChecklistResponse,
} from "../../utils/models/checklist-model";
import { ChecklistItems } from "../../components/Checklist/ChecklistItems";

export const Checklist = () => {
  const { listChecklists } = UseChecklist();

  const [checklistData, setChecklistData] = useState<ChecklistModel[]>();
  const [activeChecklist, setActiveChecklist] = useState<ChecklistModel>();

  useEffect(() => {
    listAllChecklists();
  }, []);

  const listAllChecklists = () => {
    listChecklists().then((res: IChecklistResponse) => {
      updateActiveChecklist(res);
    });
  };

  const updateActiveChecklist = (data: IChecklistResponse) => {
    const checklist = data.checklist;

    handleSetActiveChecklist(checklist);
  };

  const handleSetActiveChecklist = (checklist: ChecklistModel[]) => {
    setChecklistData(checklist);
    console.log("handleSetActiveChecklist :: ", checklist);

    if (activeChecklist) {
      const findActive = checklist.find(
        (cl) => cl.id === activeChecklist.id,
      ) as ChecklistModel;

      setActiveChecklist(findActive ? findActive : checklist[0]);
    } else {
      setActiveChecklist(checklist[0]);
    }
  };

  return (
    <>
      {checklistData && activeChecklist && (
        <View style={styles.container}>
          <ThemedText type="defaultSemiBold">Checklist</ThemedText>
          <ChecklistListing
            checklistData={checklistData}
            onUpdate={(value: IChecklistResponse) =>
              updateActiveChecklist(value)
            }
            setActive={(checklist: ChecklistModel) =>
              setActiveChecklist(checklist)
            }
          />

          {activeChecklist && (
            <ChecklistItems
              activeChecklist={activeChecklist}
              onUpdate={(value: IChecklistResponse) =>
                updateActiveChecklist(value)
              }
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    // flex: 1,
    gap: 15,
  },
  kanbanBoard: {
    height: "100%",
  },
});
