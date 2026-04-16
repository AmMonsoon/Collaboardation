import { useState, useEffect } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../../src/api/taskApi";

const BoardItem = ({projectId, board, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description)
    const [tasks, setTasks] = useState([])
    const [tasksLoading, setTasksLoading] = useState(false)
    const [tasksError, setTasksError] = useState(null)

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newTaskDescription, setNewTaskDescription] = useState("")


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
   const handleCreateTask = async () => {
  if (!newTaskTitle.trim()) {
    setTasksError("Task title is required.")
    return
  }

  if (newTaskTitle.length > 30) {
    setTasksError("Task title must be 30 characters or less.")
    return
  }

  try {
    setTasksError(null)

    const createdTask = await createTask({
      projectId,
      boardId: board.id,
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: new Date().toISOString()
    })

    setTasks(prev => [...prev, createdTask])

    setNewTaskTitle("")
    setNewTaskDescription("")
  } catch (error) {
    console.error("Create task error:", error)
    setTasksError("Failed to create task.")
  }
}

   

const handleUpdateTask = async (task) => {
  try {
    setTasksError(null)

    const updatedTask = await updateTask({
      projectId,
      boardId: board.id,
      taskId: task.id,
      title: `${task.title} Edited`,
      description: task.description,
      dueDate: task.dueDate
    })

    setTasks(prev =>
      prev.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    )
  } catch (error) {
    console.error("Update task error:", error)
    setTasksError("Failed to update task.")
  }
}

const handleDeleteTask = async (taskId) => {
  try {
    setTasksError(null)

    await deleteTask({
      projectId,
      boardId: board.id,
      taskId
    })

    setTasks(prev =>
      prev.filter(task => task.id !== taskId)
    )
  } catch (error) {
    console.error("Delete task error:", error)
    setTasksError("Failed to delete task.")
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
            <div className="task-section">
  <h4>Tasks</h4>

  {tasksError && <p style={{ color: "red" }}>{tasksError}</p>}
  {tasksLoading && <p>Loading tasks...</p>}

  {!tasksLoading && tasks.length === 0 && (
    <p>No tasks yet</p>
  )}
    <div className="new-task-form">
  <input
    value={newTaskTitle}
    onChange={e => setNewTaskTitle(e.target.value)}
    placeholder="Task title"
  />

  <input
    value={newTaskDescription}
    onChange={e => setNewTaskDescription(e.target.value)}
    placeholder="Task description"
  />

  <button onClick={handleCreateTask}>
    Add Task
  </button>
</div>
  <ul>
    {tasks.map(task => (
      <li key={task.id}>
        <p>{task.title}</p>
        <p>{task.description}</p>

        <button onClick={() => handleUpdateTask(task)}>
          Edit Task
        </button>

        <button onClick={() => handleDeleteTask(task.id)}>
          Delete Task
        </button>
      </li>
    ))}
  </ul>
</div>

        </>
        )
        }
        
    </li>
   )
}

export default BoardItem;