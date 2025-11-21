import { useState, useEffect } from "react";
import { KanbanContext } from "./KanbanContext";

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Prevents overwriting localStorage with an initial empty state before data is loaded
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const localTasks = localStorage.getItem("kanbanTasks");

        if (localTasks) {
          setTasks(JSON.parse(localTasks));
        } else {
          const response = await fetch("https://dummyjson.com/todos?limit=5");
          const data = await response.json();

          const initialTasks = {
            todo: [],
            inProgress: [],
            done: [],
          };

          data.todos.forEach((item) => {
            const newTask = {
              id: item.id,
              title: item.todo || "Tarea sin título",
              createdAt: new Date().toISOString(),
            };

            if (item.completed) {
              initialTasks.done.push(newTask);
            } else {
              initialTasks.todo.push(newTask);
            }
          });

          setTasks(initialTasks);
        }
      } catch (error) {
        console.error("Se ha producido un error al cargar las tareas:", error);
        setTasks({ todo: [], inProgress: [], done: [] });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [newTask, ...prevTasks.todo],
    }));
  };

  const moveTask = (taskId, targetColumn) => {
    setTasks((prevTasks) => {
      let taskToMove;
      let sourceColumn;

      for (const [columnName, columnTasks] of Object.entries(prevTasks)) {
        const task = columnTasks.find((t) => t.id === taskId);
        if (task) {
          taskToMove = task;
          sourceColumn = columnName;
          break;
        }
      }

      if (!taskToMove || sourceColumn === targetColumn) {
        return prevTasks;
      }

      const newTasksState = {
        todo: [...prevTasks.todo],
        inProgress: [...prevTasks.inProgress],
        done: [...prevTasks.done],
      };

      newTasksState[sourceColumn] = newTasksState[sourceColumn].filter(
        (t) => t.id !== taskId
      );

      newTasksState[targetColumn] = [
        taskToMove,
        ...newTasksState[targetColumn],
      ];

      return newTasksState;
    });
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => {
      const newTasksState = { ...prevTasks };
      const safeTaskId = String(taskId); 

      for (const columnName in newTasksState) {
        newTasksState[columnName] = newTasksState[columnName].filter(
          task => String(task.id) !== safeTaskId
        );
      }

      return newTasksState;
    });
  };

  const contextValue = {
    tasks,
    addTask,
    moveTask,
    deleteTask,
  };

  return (
    <KanbanContext.Provider value={contextValue}>
      {children}
    </KanbanContext.Provider>
  );
};
