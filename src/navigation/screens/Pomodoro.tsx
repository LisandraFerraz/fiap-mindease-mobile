import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { PomodoroTimer } from "../../utils/hooks/functionalities/usePomodoroTimer";
import { TodoCard } from "../../components/ui/TodoCard";
import { PomodoroTodo } from "../../utils/models/pomodoro-model";
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

  useEffect(() => {
    getPomodoroTasks();
  }, []);

  const getPomodoroTasks = () => {
    listPomodoroTasks().then((res) => {
      setPomoTodoList(res);
    });
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

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
  },

  to_do_list: {
    marginVertical: "5%",
    paddingHorizontal: 25,
    gap: 25,
  },
});
