import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProjects, createProject } from "../../src/api/projectApi";
import CreateProjectModal from "./CreateProjectModal";
import "./SideBar.css"

const SideBar = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // const [project, setProject] = useState()
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (id) => {
        return location.pathname.startsWith(`/projects/${id}`);
    };

    const addProject = async(title) => {
        try {
            const newProject = await createProject({title})
            console.log("NEWPROJECT", newProject)
          
            setProjects((prev)=> [...prev, newProject])
            navigate(`/projects/${newProject.id}`)
        } catch (error) {
            console.error("Sidebar create project error", error)
            setError("Failed to create new project")
        }
    }

    

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                const data = await getProjects()
                setProjects(data)
            } catch (error) {
                console.error("Sidebar project fetch error", error)
                setError("Failed to load projects")
            }finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [])

    
    return(
        <aside className="sidebar">
            <button 
                className="create-project-button" 
                onClick={() => setIsCreateOpen(true)}
                >
                +
            </button>
            {isCreateOpen && (
                    <CreateProjectModal 
                        onClose={ ()=> setIsCreateOpen(false)} 
                        onCreate={addProject}/>
            )}
            <h2 className="sidebar-title">Projects</h2>
            {loading && <p>Loading...</p>}
            {error &&  <p  style= {{color: "red"}}>{error}</p>}
            <ul className="sidebar-list">
                {projects.map( project => (
                    <li
                    key={project.id}
                    className={`sidebar-item ${isActive(project.id)} ? "active" : "" `}
                    onClick={()=> navigate(`/projects/${project.id}`)}>
                        {project.title}
                    </li>
                ))}
            </ul>
        </aside>


    )

}

export default SideBar;