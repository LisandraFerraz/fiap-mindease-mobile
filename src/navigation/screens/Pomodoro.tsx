import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { CustomTheme } from "../../theme/utils/theme-interface";
import { PomodoroTimer } from "../../utils/hooks/functionalities/usePomodoroTimer";
import { TodoCard } from "../../components/ui/TodoCard";
import { PomodoroTodo } from "../../utils/models/interfaces-model";
import { InputAddTask } from "../../components/ui/InputAddTask";
import { UsePomodoro } from "../../utils/hooks/api-calls/usePomodoro";
import uuid from "react-native-uuid";

export function Pomodoro() {
  const {
    addPomodoroTask,
    deletePomodoroTask,
    listPomodoroTasks,
    updatePomodoroTaskStatus,
  } = UsePomodoro();

  const [pomoTodoList, setPomoTodoList] = useState<PomodoroTodo[]>([]);
  const [pomoTodoBody, setPomoTodoBody] = useState<PomodoroTodo>(
    new PomodoroTodo(),
  );

  const { colors } = useTheme() as CustomTheme;
  const styles = useMemo(() => stylesSheet(colors), [colors]);

  useEffect(() => {
    getPomodoroTasks();
  }, []);

  const getPomodoroTasks = () => {
    listPomodoroTasks().then((res) => {
      setPomoTodoList(res);
    });

    console.log(pomoTodoList);
  };

  const updateTodo = (item: PomodoroTodo) => {
    const body: PomodoroTodo = {
      ...item,
      completed: !item.completed,
    };
    updatePomodoroTaskStatus(body).then((res) => {
      setPomoTodoList(res);
    });
  };

  const handleAddTask = () => {
    setPomoTodoBody({
      ...pomoTodoBody,
      completed: false,
      id: uuid.v4(),
    });

    addPomodoroTask(pomoTodoBody).then((res) => {
      setPomoTodoBody(new PomodoroTodo());
      setPomoTodoList(res);
    });
  };

  const handleDeleteTask = (id: string) => {
    deletePomodoroTask(id).then((res) => {
      setPomoTodoList(res);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <PomodoroTimer />

      <View style={styles.to_do_list}>
        <InputAddTask
          placeholder="Criar tarefa..."
          value={pomoTodoBody?.description}
          valueChange={(e) => {
            setPomoTodoBody({ ...pomoTodoBody, description: e });
          }}
          addTask={handleAddTask}
        />
        {pomoTodoList.map(
          (todo, index) =>
            todo && (
              <TodoCard
                key={index}
                deleteItem={() => handleDeleteTask(todo.id)}
                markAs={() => updateTodo(todo)}
                description={todo.description}
                isCompleted={todo.completed}
              />
            ),
        )}
      </View>
    </ScrollView>
  );
}

const stylesSheet = (color: any) =>
  StyleSheet.create({
    container: {
      marginTop: "10%",
    },

    to_do_list: {
      marginVertical: "5%",
      paddingHorizontal: 25,
      gap: 25,
    },
  });
