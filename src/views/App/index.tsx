import React from "react"; 
import { useToDoStore } from "../../data/stores/useToDoStore"; 
import styles from "./index.module.scss"; 
import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";
 
export const App: React.FC = () => { 
  const { tasks, createTask, removeTask, updateTask } = useToDoStore() 
 
  return ( 
    <article className={styles.article}> 
      <h1 className={styles.articleTitle}>To Do App</h1> 
      <section className={styles.articleSection}>
            <InputPlus onAdd={(title) => {
                if(title){
                    createTask(title);
                }
            }}></InputPlus>
        </section> 
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no any task</p>
        )}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id= {task.id}
            title ={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
        </section> 
    </article> 
  ); 
};
