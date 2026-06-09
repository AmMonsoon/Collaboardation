import { useState, useEffect } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../../src/api/taskApi";
import TaskItem from "./TaskItem";
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd"
import "./BoardItem.css"

const BoardItem = ({projectId, board, tasks, setTasksByBoardId, onUpdate, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description)
    // const [tasks, setTasks] = useState([])
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
  //  useEffect(() => {
  //   const fetchTasks = async() => {
  //       try {
  //           setTasksLoading(true);
  //           setTasksError(null)
  //           const tasks = await getTasks({
  //               projectId,
  //               boardId: board.id,
  //           })
  //           setTasks(tasks)
  //       } catch (error) {
  //           console.error("Fetch tasks error:", error);
  //           setTasksError("Failed to load tasks")
  //       } finally {
  //           setTasksLoading(false)
  //       }
  //   }
  //   fetchTasks()
  //  },[projectId, board.id])

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

    setTasksByBoardId(prev => ({
      ...prev,
      [board.id]: [...(prev[board.id] || []),
      createdTask]})
    )

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
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    })

    setTasksByBoardId(prev => ({
      ...prev,
      [board.id]: (prev[board.id] || []).map(task => task.id === updatedTask.id ? updatedTask : task)
    }))
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

    setTasksByBoardId(prev => ({
      ...prev,
      [board.id]: (prev[board.id] || []).filter(task => task.id !== taskId)
    }))
  } catch (error) {
    console.error("Delete task error:", error)
    setTasksError("Failed to delete task.")
  }
}


   return (
    <li className="board-column">
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
                    data-testid="task-title-input"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="Task title"
                />

              <input
                data-testid="task-description-input"
                value={newTaskDescription}
                onChange={e => setNewTaskDescription(e.target.value)}
                placeholder="Task description"
              />

  <button 
  data-testid="submit-task-button"
  onClick={handleCreateTask}>
    Add Task
  </button>
</div>
 
  <Droppable droppableId={`board-${board.id}`}>
    {(provided) => (
      <ul
        className="task-list"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {tasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={`task-${task.id}`}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskItem
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}
          </Draggable>
        ))}

        {provided.placeholder}
      </ul>
    )}
  </Droppable>

</div>

        </>
        )
        }
        
    </li>
   )
}

export default BoardItem;