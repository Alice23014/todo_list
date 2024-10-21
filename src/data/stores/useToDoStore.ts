import { create } from 'zustand'
import { generateId } from '../helpers';

interface Task{
    id:string;
    title: string;
    createdAt: number;
}

interface ToDoStore{
    tasks: Task[];
    createTask: (title: string) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, title: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get)=>({
    tasks: [
        {
        id: '1',
        title: 'Task 1',
        createdAt: Date.now(),
    }
],
    createTask: (title) => {
        const{tasks} = get();
        const newTask ={
            id: generateId(),
            title,
            createdAt: Date.now(),
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    removeTask:(id:string) =>{
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    },
    updateTask: (id:string, title:string) => {
        const {tasks} = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
    },
}))