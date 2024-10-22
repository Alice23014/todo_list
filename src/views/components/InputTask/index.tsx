import React, {useState} from "react"; 
import { useToDoStore } from "../../data/stores/useToDoStore"; 
import styles from "./index.module.scss"; 

interface InputTaskProps {
    id: string;
    title: string;
    onDone:(id: string) => void
    onEdited:(id: string, title: string) => void;
    onRemoved:(id: string) => void;
}
 
export const InputTask: React.FC<InputTaskProps> = (
    {id, title, onDone, onEdited, onRemoved}
) => {
    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
            <input 
            type='checkbox' 
            disabled={isEditMode}
            checked={checked} 
            className={styles.inputTaskCheckbox} 
            onChange={(e)=>{
                setChecked(e.target.checked)
                if(e.target.checked){
                    onDone(id)
                }
                }}>
            </input> 
            {isEditMode ? (
                <input value={value} onChange={(e)=>{setValue(e.target.value)}} className={styles.inputTaskTitleEdit}></input>
            ): (<h3 className={styles.inputTaskTitle}>{title}</h3>)}
           </label>
           {isEditMode ? (<button aria-label='Save' className={styles.inputTaskSave} onKeyDown={(e)=> {if(e.key=== "Enter"){onEdited(id, value); setIsEditMode(false)}}} onClick={()=>{onEdited(id, value); setIsEditMode(false)}}></button>) : (
               <button aria-label='Edit' className={styles.inputTaskEdit} onClick={()=>{setIsEditMode(true)}}></button>
           )}
            <button aria-label='Remove' className={styles.inputTaskRemove} onClick={()=>{
                if(confirm('Are you sure?')){
                    onRemoved(id)
                }
            }}></button>
        </div>
    )
}