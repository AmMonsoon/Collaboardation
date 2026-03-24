import { useState, useEffect } from "react";
import { createTask } from "../../src/api/taskApi";

const BoardItem = ({projectId, board, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description)

    useEffect(()=> {
        setTitle(board.title)
        setDescription(board.description || "")
    },[board.title, board.description])

   const handleSave = async() => {
    try {
        await onUpdate({
           boardId: board.id,
           title,
           description
       })
       
       setIsEditing(false)
    } catch (error) {
        console.error("Updating board error:", err);
    }
   }

   const handleCancel = () => {
    setTitle(board.title)
    setDescription(board.description)
    setIsEditing(false)
   }

   const handleCreateTask = async() => {
    try {
        const task = await createTask({
            projectId,
            boardId,
            title,
            description,
            position,
            dueDate})
        

    } catch (error) {
        
    }
   }

   return (
    <li>
        
        {isEditing ? (
        <>
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            >
            </input>
            <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button onClick={handleSave}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
        ) : (
        <>
            <h3>{board.title}</h3>
            <p>{board.description}</p>
            <button onClick={() => setIsEditing(true)}> ✏️ Edit</button>
            <button onClick={() => onDelete(board.id)}> 🗑️ Delete</button>

            <button onClick={handleCreateTask}>Create Task</button>
        </>
        )
        }
        
    </li>
   )
}

export default BoardItem;