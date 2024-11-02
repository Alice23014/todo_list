import { create } from "zustand";
import { State, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { generateId } from "../helpers";

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
}

const persistMiddleware =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState) => {
        set(nextState);
        localStorage.setItem("todoStore", JSON.stringify(get()));
      },
      get,
      api
    );

export const useToDoStore = create<ToDoStore>()(
  devtools(
    persistMiddleware((set, get) => {
      const storedTasks = localStorage.getItem("todoStore");
      const initialTasks = storedTasks
        ? JSON.parse(storedTasks).tasks
        : [
            {
              id: "1",
              title: "Task 1",
              createdAt: 423423,
            },
            {
              id: "2",
              title: "Task 2",
              createdAt: 2423525,
            },
          ];

      return {
        tasks: initialTasks,
        createTask: (title) => {
          const { tasks } = get();
          const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
          };
          set({
            tasks: [newTask, ...tasks],
          });
        },
        removeTask: (id: string) => {
          const { tasks } = get();
          set({
            tasks: tasks.filter((task) => task.id !== id),
          });
        },
        updateTask: (id: string, title: string) => {
          const { tasks } = get();
          set({
            tasks: tasks.map((task) => ({
              ...task,
              title: task.id === id ? title : task.title,
            })),
          });
        },
      };
    })
  )
);
