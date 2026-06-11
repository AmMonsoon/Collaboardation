import { useEffect, useState } from "react"
import"./TaskItem.css"

const TaskItem = ({task, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || "")

    useEffect(() => {
        setTitle(task.title)
        setDescription(task.description || "")
    },[task.title, task.description])


    const handleSave = async () => {
        await onUpdate({
            ...task,
            title,
            description
        })
        setIsEditing(false)
    }

    const handleCancel = async () => {
        setTitle(task.title)
        setDescription(task.description || "")
        setIsEditing(false)
    }

    if(isEditing){
        return(
            <li data-testid="task-card" className="task-card">
                <input 
                    data-testid="edit-task-title-input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    data-testid="edit-task-description-input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button data-testid="edit-task-save-button" onClick={handleSave}>Save</button>
                <button data-testid="edit-task-cancel-button" onClick={handleCancel}>Cancel</button>
            </li>
        )
    }

    return(
        <li className="task-card" data-testid="task-card">
            <p data-testid="task-title">{task.title}</p>
            <p data-testid= "task-description">{task.description || "No Description"}</p>
            <button data-testid="task-edit-button" onClick={()=>  setIsEditing(true)}> Edit </button>
            <button data-testid="task-delete-button" onClick={() => onDelete(task.id)}> Delete </button>
        </li>
    )

}

export default TaskItem;