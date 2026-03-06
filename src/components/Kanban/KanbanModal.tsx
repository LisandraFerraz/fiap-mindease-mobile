import { StyleSheet, View } from "react-native";
import { ModalTemplate } from "../ui/ModalTemplate";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import { IKanbanColumn, IKanbanTodo } from "../../utils/models/kanban-model";
import InputText from "../ui/InputText";
import { UseKanban } from "../../utils/hooks/api-calls/useKanban";
import uuid from "react-native-uuid";

export const KanbanModal = ({
  isOpen,
  data,
  onClose,
  saveData,
}: {
  isOpen: boolean;
  data?: IKanbanTodo;
  onClose: () => void;
  saveData: (data?: IKanbanColumn[]) => void;
}) => {
  const { addNewKanbanItem, updateKanbanItem } = UseKanban();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const [modalItemData, setModalItemData] = useState<IKanbanTodo>();

  useEffect(() => {
    if (data) {
      setModalItemData(data);
    } else {
      setModalItemData(new IKanbanTodo());
    }
  }, []);

  const updateBodyField = (field: keyof IKanbanTodo, value: string) => {
    const body = {
      ...modalItemData,
      [field]: value,
    } as IKanbanTodo;

    setModalItemData(body);
  };

  const handleData = () => {
    if (data) {
      updateKanbanItem(modalItemData!).then((res: IKanbanColumn[]) => {
        saveData(res);
        setModalItemData(new IKanbanTodo());
      });
    } else {
      const body = {
        ...modalItemData,
        id: uuid.v4(),
      } as IKanbanTodo;

      addNewKanbanItem(body).then((res: IKanbanColumn[]) => {
        saveData(res);
        setModalItemData(new IKanbanTodo());
      });
    }
  };

  return (
    <>
      {isOpen && (
        <ModalTemplate
          onBtnConfirm={handleData}
          onClose={onClose}
          isOpen={isOpen}
        >
          <View style={styles.form_body}>
            <InputText
              label="título"
              placeholder="Digite aqui..."
              value={modalItemData?.title}
              onChange={(e: string) => updateBodyField("title", e)}
            />
            <InputText
              label="descrição"
              placeholder="Adicione detalhes"
              value={modalItemData?.description}
              onChange={(e: string) => updateBodyField("description", e)}
            />
            <InputText
              label="prioridade"
              placeholder="Digite aqui..."
              value={modalItemData?.priority}
              onChange={(e: string) => updateBodyField("priority", e)}
            />
            <InputText
              label="status"
              placeholder="Digite aqui..."
              value={modalItemData?.status}
              onChange={(e: string) => updateBodyField("status", e)}
            />
            <InputText
              label="vencimento"
              placeholder="Digite aqui..."
              value={modalItemData?.dueDate}
              onChange={(e: string) => updateBodyField("dueDate", e)}
            />
          </View>
        </ModalTemplate>
      )}
    </>
  );
};

const stylesSheet = (color: any) =>
  StyleSheet.create({
    form_body: {
      flexDirection: "column",
      gap: 25,
    },
  });
