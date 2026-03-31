import { useState, useEffect } from "react";
import { createTask, getTasks, updateTask } from "../../src/api/taskApi";

const BoardItem = ({projectId, board, taskId, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description)
    console.log("%^%^%^%^%^%^%^%", taskId)
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
            boardId: board.id,
            title: "New Title",
            description: "Testing...",
            dueDate: new Date().toISOString()
        })
        console.log("Created Task", task)
    } catch (error) {
        console.error("Create task error:", error);
    }
   }

   const handleFetchTasks= async() => {
    try {
        const tasks = await getTasks({
            projectId,
            boardId: board.id,
        })
        console.log("Fetched Tasks", tasks)
    } catch (error) {
        console.error("Fetch tasks error:", error);
    }
   }

   const handleUpdateTask= async() => {
    try {
        const updatedTask = await updateTask({
            projectId,
            boardId: board.id,
            taskId: 6,
            title: "Another Test Task Edited",
            description,
        })
        console.log("Updated Task", updatedTask)
    } catch (error) {
        console.error("Updated task error:", error);
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
            <button onClick={handleFetchTasks}>Get Tasks</button>
            <button onClick={handleUpdateTask}>Update Tasks</button>


        </>
        )
        }
        
    </li>
   )
}

export default BoardItem;