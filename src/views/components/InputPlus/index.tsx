import React, {useCallback, useState} from "react"; 
import { useToDoStore } from "../../data/stores/useToDoStore"; 
import styles from "./index.module.scss"; 

interface InputPlusProps {
    onAdd: (title: string) => void
}
 
export const InputPlus: React.FC<InputPlusProps> = (
    {onAdd}
) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(()=>{
        onAdd(inputValue);
        setInputValue('');
    },[inputValue])

    return (
        <div className={styles.inputPlus}>
            <input type='text' className={styles.inputPlusValue} value={inputValue} placeholder="Type here..." onChange={(e) => {setInputValue(e.target.value)}} onKeyDown={(e)=>{if(e.key === 'Enter'){addTask()}}}></input>
            <button aria-label='add' className={styles.inputPlusButton} onClick={addTask}></button>
        </div>
    )
}