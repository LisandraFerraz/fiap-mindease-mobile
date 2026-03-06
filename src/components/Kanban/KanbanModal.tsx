import { StyleSheet, View } from "react-native";
import { ModalTemplate } from "../ui/ModalTemplate";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { useEffect, useMemo, useState } from "react";
import {
  IKanbanColumn,
  IKanbanTodo,
  kanbanStatus,
} from "../../utils/models/kanban-model";
import InputText from "../ui/InputText";
import { UseKanban } from "../../utils/hooks/api-calls/useKanban";
import uuid from "react-native-uuid";
import { hasEmptyValues } from "../../utils/functions/validate-empty-values";
import { InputSelect } from "../ui/InputSelect";
import { GetKanbanStatus } from "../../utils/functions/get-kanban-keys";

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

  const getStatusList = () => {
    const list = Object.keys(kanbanStatus);
    return list.map((status: any) => {
      return {
        label: GetKanbanStatus(status),
        value: status as keyof kanbanStatus,
      };
    });
  };

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  const [modalItemData, setModalItemData] = useState<IKanbanTodo>(
    new IKanbanTodo(),
  );

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

  const isFormValid = (): boolean => {
    if (modalItemData) {
      const { id, dayCountMessage, ...rest } = modalItemData;

      return hasEmptyValues(rest);
    }
    return false;
  };

  return (
    <>
      {isOpen && (
        <ModalTemplate
          onBtnConfirm={handleData}
          onClose={onClose}
          isOpen={isOpen}
          btnDisabled={isFormValid()}
        >
          <View style={styles.form_body}>
            <InputText
              label="título"
              placeholder="Digite aqui..."
              required={true}
              value={modalItemData?.title}
              onChange={(e: string) => updateBodyField("title", e)}
            />
            <InputText
              label="descrição"
              placeholder="Adicione detalhes"
              required={true}
              value={modalItemData?.description}
              onChange={(e: string) => updateBodyField("description", e)}
            />
            <InputText
              label="prioridade"
              placeholder="Digite aqui..."
              required={true}
              value={modalItemData?.priority}
              onChange={(e: string) => updateBodyField("priority", e)}
            />
            <InputSelect
              label="status"
              type="status"
              required={true}
              options={getStatusList()}
              selected={modalItemData.status}
              setSelectedOption={(e: string) => updateBodyField("status", e)}
            />
            {/* vencimento */}
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
