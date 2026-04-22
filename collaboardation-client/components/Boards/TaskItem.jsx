import { useEffect, useState } from "react"

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
            <li>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </li>
        )
    }

    return(
        <li>
            <p>{task.title}</p>
            <p>{task.description || "No Description"}</p>
            <button onClick={()=>  setIsEditing(true)}> Edit </button>
            <button onClick={() => onDelete(task.id)}> Delete </button>
        </li>
    )

}

export default TaskItem;