import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/projectApi";
import { createBoard, getBoards } from "../../api/boardApi";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [error, setError] = useState(null);
  const [boards, setBoards] = useState([])
  const [loadingBoards, setLoadingBoards] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoadingProject(true);
        const data = await getProject({ id });
        setProject(data);
      } catch (err) {
        console.error("Project fetch error:", err);
        setError("Failed to load project");
      } finally {
        setLoadingProject(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoadingBoards(true);
        const data = await getBoards({projectId: Number(id)});
        setBoards(data);
      } catch (err) {
        console.error("Boards fetch error:", err);
        setError("Failed to load boards");
      } finally {
        setLoadingBoards(false);
      }
    };

    fetchBoards();
  }, [id]);

  if (loadingProject) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;
  
  if (loadingBoards) return <p>Loading boards...</p>;
  if (!boards || boards.length === 0) return <p>No Boards Yet</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
    <div>
      <h1>{project.title}</h1>
      <p style={{ opacity: 0.7 }}>Project ID: {project.id}</p>

      {/* Boards will be added here next */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Boards</h2>
        {boards.map(board => (
        <>
          <li key={board.id}>
          <h3>{board.title}</h3>
          <p>{board.description}</p>
          </li>
        </>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;