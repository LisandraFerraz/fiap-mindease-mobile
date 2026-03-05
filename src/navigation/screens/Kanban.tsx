import { useEffect, useMemo, useState } from "react";
import { UseKanban } from "../../utils/hooks/api-calls/useKanban";
import { IKanbanColumn } from "../../utils/models/kanban-model";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "../../theme/utils/theme-interface";
import {
  CardModel,
  ColumnModel,
  KanbanBoard,
} from "@intechnity/react-native-kanban-board";

export function Kanban() {
  const {
    addNewKanbanItem,
    deleteKanbanItem,
    getKanbanItems,
    updateKanbanItem,
  } = UseKanban();

  const [kanbanData, setKanbanData] = useState<IKanbanColumn[]>();
  const [kanbanColumns, setKanbanColumns] = useState<any>();
  const [kanbanCards, setKanbanCards] = useState<any>();

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  useEffect(() => {
    listKanbanItems();
  }, []);

  const listKanbanItems = () => {
    getKanbanItems().then((res: IKanbanColumn[]) => {
      setKanbanData(res);

      let columns: any[] = [];
      let cards: any[] = [];

      res.forEach((column) => {
        columns.push(new ColumnModel(column.id, column.title, column.id));

        for (let card of column.items) {
          cards.push(
            new CardModel(
              card.id,
              card.status,
              card.title,
              "",
              card.description,
              [],
              null,
              0,
            ),
          );
        }
      });

      setKanbanColumns(columns);
      setKanbanCards(cards);
    });
  };

  const onCardDragEnd = (
    srcColumn: ColumnModel,
    destColumn: ColumnModel,
    item: CardModel,
    targetIdx: number,
  ) => {};

  const onCardPress = (item: CardModel) => {
    // Handle card press
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <KanbanBoard
          style={{
            backgroundColor: colors.bg_color_container,
          }}
          columns={kanbanColumns}
          cards={kanbanCards}
          onDragEnd={onCardDragEnd}
          onCardPress={onCardPress}
        />
      </View>
    </ScrollView>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      height: 100,
      flex: 1,
      //   backgroundColor: color.bg_color_container,
    },
    kanbanBoard: {
      height: "100%",
    },

    kanbanContainer: {
      //   backgroundColor: color.bg_color_container,
    },
  });
