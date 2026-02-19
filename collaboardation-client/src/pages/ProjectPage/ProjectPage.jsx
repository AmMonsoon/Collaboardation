import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/projectApi";
import { createBoard, getBoards, getBoard, updateBoard, deleteBoard} from "../../api/boardApi";

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
          const createdBoard = await createBoard({
            projectId: Number(id),
            title: newBoardTitle,
            description: newBoardDescription
          })

          setBoards(prev => [...prev,  createBoard])

          setNewBoardTitle("")
          setNewBoardDescription("")
        } catch (error) {
          console.error("Create board error:", err);
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
          console.log(updatedBoard)
          setBoards( prev =>
            prev.map( board => board.id === updatedBoard.id ? updatedBoard : board)
          );
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
  

  return (
    <div>
      <h1>{project.title}</h1>
      <p style={{ opacity: 0.7 }}>Project ID: {project.id}</p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Boards</h2>
        <button onClick={createBoard}>New Board</button>
        {boardError && <p style={{ color: "red" }}>{boardError}</p>}
        {boardLoading && <p>Loading boards...</p>}
        {!boardLoading && boards.length === 0 && <p>No Boards Yet</p>}
        {boards.map(board => (
        <li key={board.id}>
          <h3>{board.title}</h3>
          <p>{board.description}</p>
          <button onClick={ () => {
            handleUpdateBoard({
              boardId: board.id,
              title: board.title + "(Edited)",
              description: board.description
            })
          }}>✏️ Edit</button>
          <button onClick={() => handleDeleteBoard(board.id)}>🗑️ Delete</button>
        </li>
        
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;