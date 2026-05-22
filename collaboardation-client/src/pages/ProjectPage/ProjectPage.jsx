import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/projectApi";
import { createBoard, getBoards, getBoard, updateBoard, deleteBoard} from "../../api/boardApi";
import BoardItem from "../../../components/Boards/BoardItem";
import { DragDropContext } from "@hello-pangea/dnd";
import { getTasks, updateTask } from "../../api/taskApi";
import "./ProjectPage.css"

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);

  const [boards, setBoards] = useState([])
  const [boardLoading, setBoardLoading] = useState(true);
  const [boardError, setBoardError] = useState(null);

  const [newBoardTitle, setNewBoardTitle] = useState("")
  const [newBoardDescription, setNewBoardDescription] = useState("")

  const [tasksByBoardId, setTasksByBoardId] = useState({})

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProjectLoading(true);
        setProjectError(null)
        const data = await getProject({ id });
        setProject(data);
      } catch (err) {
        console.error("Project fetch error:", err);
        setProjectError("Failed to load project");
      } finally {
        setProjectLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setBoardLoading(true);
        setBoardError(null)
        const data = await getBoards({projectId: Number(id)});
        setBoards(data);
        const taskEntries = await Promise.all(data.map( async (board) => {
          const tasks = await getTasks(
            {
              projectId: Number(id),
              boardId: board.id
            })
            return [board.id, tasks]
        }))
        setTasksByBoardId(Object.fromEntries(taskEntries))
      } catch (err) {
        console.error("Boards fetch error:", err);
        setBoardError("Failed to load boards");
      } finally {
        setBoardLoading(false);
      }
    };

    fetchBoards();
  }, [id]);


   

  if (projectLoading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;
  if (projectError) return <p style={{ color: "red" }}>{error}</p>;

    const handleCreateBoard = async() => {
        try {
          if(!newBoardTitle || newBoardTitle.trim().length === 0){
            setBoardError("Title is required")
            return
          } 
          if(newBoardTitle.length > 30){
            setBoardError("Title must be 30 characters or less")
            return 
          } 
          const createdBoard = await createBoard({
            projectId: Number(id),
            title: newBoardTitle,
            description: newBoardDescription
          })
          
          setBoards(prev => [...prev,  createdBoard])

          setNewBoardTitle("")
          setNewBoardDescription("")
        } catch (error) {
          console.error("Create board error:", error);
          setBoardError("Failed to create board");
        }
      }
  

    const handleUpdateBoard = async({
      boardId,
      title, 
      description}) => {
      try {
          setBoardError(null)
          setBoardLoading(true);
          if(!title || title.trim().length === 0){
            setBoardError("Title is required")
            return
          } 
          if(title.length > 30){
            setBoardError("Title must be 30 characters or less")
            return 
          } 

          const updatedBoard = await updateBoard({projectId: Number(id), boardId, title, description});
          setBoards( prev =>
            prev.map( board => board.id === updatedBoard.id ? updatedBoard : board)
          )
          return updatedBoard
        } catch (err) {
          console.error("Updating board error:", err);
          setBoardError("Failed to update board");
        } finally {
          setBoardLoading(false);
        }
    }

    const handleDeleteBoard = async(boardId) => {

      try {
        setBoardError(null)
  
        await deleteBoard({
         projectId: Number(id),
         boardId
        })
        setBoards(prev => prev.filter( board => board.id !== boardId))
      } catch (error) {
        setBoardError("Failed to delete board")
      }
    }

    const reorderTasks = (list, startIndex, endIndex) => {
      const result = [...list]
      const [removed] = result.splice(startIndex, 1)

      result.splice(endIndex, 0, removed)

      return result
    }

    const assignPositions = (tasks) => {
      return tasks.map((task, index) => ({
        ...task,
        index
      }))   
    }
    
    
  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    // User dropped outside a droppable area
    if (!destination) return;

    // Convert "board-5" -> 5
    const sourceBoardId = Number(source.droppableId.replace("board-", ""));
    const destinationBoardId = Number(destination.droppableId.replace("board-", ""));
    

    let movedTask
    let tasksToPersist = []

    // Remove dragged task from source board
    setTasksByBoardId((prev) => {
      // Copy source board tasks
     const sourceTasks = [...(prev[sourceBoardId] || [])];
  
     // Copy destination board tasks
     const destinationTasks = [...(prev[destinationBoardId] || [])];
     const [removedTask] = sourceTasks.splice(source.index, 1);
     movedTask = removedTask;
     

    // SAME BOARD REORDER
    if (sourceBoardId === destinationBoardId) {
      sourceTasks.splice(destination.index, 0, movedTask);

      const updatedSourceTasks = assignPositions(sourceTasks)
      tasksToPersist = updatedSourceTasks
      return {
        ...prev,
        [sourceBoardId]: updatedSourceTasks,
      };
    }

    // DIFFERENT BOARD MOVE
    destinationTasks.splice(destination.index, 0,{...movedTask, boardId: destinationBoardId }
    );

      const updatedSourceTasks = assignPositions(sourceTasks)
      const updatedDestinationTasks = assignPositions(destinationTasks)

      tasksToPersist = [
        ...updatedSourceTasks,
        ...updatedDestinationTasks
      ]
      
    return {
      ...prev,
      [sourceBoardId]: updatedSourceTasks,
      [destinationBoardId]: updatedDestinationTasks,
    };
  });

  try {
    await Promise.all(
      tasksToPersist.map((task) =>
        updateTask({
          projectId: Number(id),
          boardId: task.boardId,
          taskId: task.id,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          position: task.position,
        })
  )
);
  } catch (error) {
      console.error("Failed to persist drag update", error)
  }
};

  return (
    <div className="project-page">
      <div className="board-layout">
        <div className="new-board-form">
        <input
        value={newBoardTitle}
        onChange={(e)=> setNewBoardTitle(e.target.value)}
        placeholder="Title">
        </input>
        <input
        value={newBoardDescription}
        onChange={(e)=> setNewBoardDescription(e.target.value)}
        placeholder="Description">
        </input>
        <button onClick={handleCreateBoard}>New Board</button>
        </div>
        <h1>{project.title}</h1>
        {boardError && <p style={{ color: "red" }}>{boardError}</p>}
        {boardLoading && <p>Loading boards...</p>}
        {!boardLoading && boards.length === 0 && <p>No Boards Yet</p>}
        
      <DragDropContext onDragEnd={handleDragEnd}>
        <ul className="board-list">
          {
            boards.map(board => (
              <BoardItem
                key={board.id}
                projectId={Number(id)}
                board={board}
                tasks={tasksByBoardId[board.id] || []}
                setTasksByBoardId={setTasksByBoardId}
                onUpdate={handleUpdateBoard}
                onDelete={handleDeleteBoard}
              />
            ))
          }
        </ul>
      </DragDropContext>
        
      </div>
    </div>
  );
};

export default ProjectPage;