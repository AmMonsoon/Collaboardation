import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/projectApi";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    console.log("ProjectPage rendered");
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProject({ id });
        setProject(data);
      } catch (err) {
        console.error("Project fetch error:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p style={{ opacity: 0.7 }}>Project ID: {project.id}</p>

      {/* Boards will be added here next */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Boards</h2>
        <p>This is where boards will go.</p>
      </div>
    </div>
  );
};

export default ProjectPage;