import React from "react"; 
import { useToDoStore } from "../../data/stores/useToDoStore"; 
import styles from "./index.module.scss"; 
import { InputPlus } from "../components/InputPlus";
 
export const App: React.FC = () => { 
  const { tasks, createTask, removeTask, updateTask } = useToDoStore() 
 
  console.log(tasks); 
 
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

        </section> 
    </article> 
  ); 
};
