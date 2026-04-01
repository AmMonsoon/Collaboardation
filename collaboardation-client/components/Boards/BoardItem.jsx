import { useState, useEffect } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../../src/api/taskApi";

const BoardItem = ({projectId, board, taskId, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description)
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(false)
    const [tasksError, setTasksError] = useState(null)


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

   //Fetch Tasks
   useEffect(() => {
    const fetchTasks = async() => {
        try {
            setTasksLoading(true);
            setTasksError(null)
            const tasks = await getTasks({
                projectId,
                boardId: board.id,
            })
            setTasks(tasks)
        } catch (error) {
            console.error("Fetch tasks error:", error);
            setTasksError("Failed to load tasks")
        } finally {
            setTasksLoading(false)
        }
    }
    fetchTasks()
   },[projectId, board.id])

//    console.log(tasks)
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

   const handleDeleteTask = async() => {
    try {
        await deleteTask({projectId, boardId: board.id, taskId: 6})
        console.log(`Task: ${6} successfully deleted` )
    } catch (error) {
        console.error("Deleting task error:", error);
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
            <ul>   
              {
                tasks.map(task => (
                    <div key={task.id}>
                        {task.title}
                    </div>
            ))}
            </ul>
            <p>{board.description}</p>
            <button onClick={() => setIsEditing(true)}> ✏️ Edit</button>
            <button onClick={() => onDelete(board.id)}> 🗑️ Delete</button>

            <button onClick={handleCreateTask}>Create Task</button>
            <button onClick={handleUpdateTask}>Update Tasks</button>
            <button onClick={handleDeleteTask}> Delete Task</button>

        </>
        )
        }
        
    </li>
   )
}

export default BoardItem;