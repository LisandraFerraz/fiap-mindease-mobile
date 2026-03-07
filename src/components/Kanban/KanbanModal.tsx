import { StyleSheet, View } from "react-native";
import { ModalTemplate } from "../ui/ModalTemplate";
import { useState } from "react";
import {
  IKanbanColumn,
  IKanbanTodo,
  kanbanPriority,
  kanbanStatus,
} from "../../utils/models/kanban-model";
import InputText from "../ui/InputText";
import { UseKanban } from "../../utils/hooks/api-calls/useKanban";
import uuid from "react-native-uuid";
import { hasEmptyValues } from "../../utils/functions/validate-empty-values";
import { InputSelect } from "../ui/InputSelect";
import {
  GetKanbanPriority,
  GetKanbanStatus,
} from "../../utils/functions/get-kanban-keys";
import { InputDatePicker } from "../ui/InputDatePicker";

export const KanbanModal = ({
  isOpen,
  data,
  onClose,
  saveData,
  selectedColumn
}: {
  isOpen: boolean;
  data?: Partial<IKanbanTodo>;
  onClose: () => void;
  saveData: (data?: IKanbanColumn[]) => void;
  selectedColumn:
}) => {
  const { addNewKanbanItem, updateKanbanItem } = UseKanban();

  const [modalItemData, setModalItemData] = useState<Partial<IKanbanTodo>>(
    data ?? new IKanbanTodo(),
  );

  const updateBodyField = (field: keyof IKanbanTodo, value: any) => {
    const body = {
      ...modalItemData,
      [field]: value,
    } as IKanbanTodo;

    setModalItemData(body);
  };

  const handleData = () => {
    if (data) {
      const { dayCountMessage, ...rest } = modalItemData;

      updateKanbanItem(rest).then((res: IKanbanColumn[]) => {
        saveData(res);
        setModalItemData(new IKanbanTodo());
      });
    } else {
      const body = {
        ...modalItemData,
        id: uuid.v4(),
      } as IKanbanTodo;
      const { dayCountMessage, ...rest } = body;

      addNewKanbanItem(rest as Partial<IKanbanTodo>).then(
        (res: IKanbanColumn[]) => {
          saveData(res);
          setModalItemData(new IKanbanTodo());
        },
      );
    }
  };

  const getList = (type: any, parseFN: any) => {
    const list = Object.keys(type);
    return list.map((item: any) => {
      return {
        label: parseFN(item),
        value: item,
      };
    });
  };

  const isFormValid = (): boolean => {
    if (modalItemData) {
      const { id, dayCountMessage, ...rest } = modalItemData;

      return hasEmptyValues(rest);
    }
    return false;
  };

  const getItemDate = (): Date => {
    const dueDate = new Date(modalItemData.dueDate!);
    return dueDate;
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
            <InputSelect
              label="prioridade"
              type="prioridade"
              required={true}
              options={getList(kanbanPriority, GetKanbanPriority)}
              selected={modalItemData.priority}
              setSelectedOption={(e: string) => updateBodyField("priority", e)}
            />
            <InputSelect
              label="status"
              type="status"
              required={true}
              options={getList(kanbanStatus, GetKanbanStatus)}
              selected={modalItemData.status}
              setSelectedOption={(e: string) => updateBodyField("status", e)}
            />
            <InputDatePicker
              date={getItemDate()}
              label="Expira em"
              required={true}
              onPickDate={(e: Date) => updateBodyField("dueDate", e)}
            />
          </View>
        </ModalTemplate>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  form_body: {
    flexDirection: "column",
    gap: 25,
  },
});
