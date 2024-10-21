import React, {useCallback, useState} from "react"; 
import { useToDoStore } from "../../data/stores/useToDoStore"; 
import styles from "./index.module.scss"; 

interface InputTaskProps {
    onAdd: (title: string) => void
}
 
export const InputTask: React.FC<InputTaskProps> = (
    {onAdd}
) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(()=>{
        onAdd(inputValue);
        setInputValue('');
    },[inputValue])

    return (
        <div className={styles.inputTask}>
            <input type='text' className={styles.inputTaskValue} value={inputValue} placeholder="Type here..." onChange={(e) => {setInputValue(e.target.value)}} onKeyDown={(e)=>{if(e.key === 'Enter'){addTask()}}}></input>
            <button aria-label='add' className={styles.inputTaskButton} onClick={addTask}></button>
        </div>
    )
}