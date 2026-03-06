import { Pressable, View } from "react-native";
import { IKanbanColumn } from "../../utils/models/kanban-model";
import { ThemedText } from "../ThemedText";
import DraggableFlatList from "react-native-draggable-flatlist";
import { KanbanCard } from "./KanbanCard";
import { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";

export const KanbanColumn = ({ column }: { column: IKanbanColumn }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className="column">
      <h3>{column.title}</h3>

      {column.items.map((item) => (
        <KanbanCard key={item.id} card={item} />
      ))}
    </div>
  );

  // return (
  //   <View>
  //     <ThemedText>{column.title}</ThemedText>

  //     <DraggableFlatList
  //       data={column.items}
  //       keyExtractor={(item) => item.id}
  //       renderItem={({ item, drag }) => (
  //         <Pressable onLongPress={drag}>
  //           <KanbanCard data={item} />
  //         </Pressable>
  //       )}
  //       onDragEnd={({ data }) => {
  //         onMove(column.id, data);
  //       }}
  //     />
  //   </View>
  // );
};
