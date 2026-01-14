import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getProjects, createProject, updateProject, deleteProject } from "../../src/api/projectApi";
import CreateProjectModal from "./CreateProjectModal";
import RenameProjectModal from "./RenameProjectModal";
import "./SideBar.css"
import DeleteProjectModal from "./DeleteProjectModal";


const SideBar = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [activeProjectId, setActiveProjectId] = useState(null)
    const [actionsOpenId, setActionsOpenId] = useState(null)
    
    const navigate = useNavigate()
    const location = useLocation()

    

    const isActive = (id) => {
        return location.pathname.startsWith(`/projects/${id}`);
    };

    const openRenameModal = (project) => {
        setActiveProjectId(project.id)
        setActionsOpenId(null)
        setOpenModal("rename")
    }

    const openDeleteModal = (project) => {
        setActiveProjectId(project.id)
        setActionsOpenId(null)
         setOpenModal("delete")
    }
    
    const openCreateModal = () => setOpenModal("create")
    const closeModal = () => setOpenModal(null)

    const activeProject = projects.find((p) => p.id === activeProjectId)
    
    
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

    const renameProject = async(title) => {
        try {
            const updatedProject = await updateProject({
                id: activeProject.id,
                title
            })
            console.log("UPDATED PROJECT",updatedProject)
            setProjects((prev) => prev.map((p) => p.id === updatedProject.id ? updatedProject : p ))
            // navigate(`/projects/${updatedProject.id}`)
        } catch (error) {
            console.error("Sidebar rename project error", error)
            setError("Failed to rename project")
        }
    }
    
    const removeProject = async() => {
        if(!activeProject) return
        try {
            await deleteProject({id: activeProject.id})
            setProjects(projs => projs.filter((p) =>p .id !== activeProject.id))
            setActiveProjectId(null)
            setOpenModal(null)
            const remaining =  projects.filter(p => p.id !== activeProject.id)
            if(remaining.length > 0){
                navigate(`/projects/${remaining[0].id}`)
            }else{
                navigate(`/`)
            }
        } catch (error) {
            console.error("Sidebar delete project error", error)
            setError("Failed to delete project")
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
                    onClick={() => setOpenModal("create")}
                    >
                    +
                </button>
               
        
            {openModal === "delete" && activeProject && (
                    <DeleteProjectModal
                        projectTitle={activeProject.title}
                        onClose={closeModal} 
                        onConfirm={removeProject}/>
            )}
            {openModal === "rename" && activeProject && (
                    <RenameProjectModal
                        currentTitle={activeProject.title}
                        onClose={closeModal} 
                        onRename={renameProject}/>
            )}
            {openModal === "create" && (
                    <CreateProjectModal 
                        onClose={closeModal} 
                        onCreate={addProject}/>
            )}


            <h2 className="sidebar-title">Projects</h2>
            {loading && <p>Loading...</p>}
            {error &&  <p  style= {{color: "red"}}>{error}</p>}
            
                
            { projects.length === 0 ? (
                <div className="sidebar-empty">
                    <p>No projects yet</p>
                    <button onClick={()=> setIsCreateOpen(true)}>
                        Create your first project
                    </button>
                </div>
            ) : (
            <div className="sidebar-content">
                <ul className="sidebar-list">
                    {projects.map( project => (
                        <li
                        key={project.id}
                        className={`sidebar-item ${isActive(project.id)} ? "active" : "" `}
                        onClick={()=> {
                            setActiveProjectId(project.id)
                            navigate(`/projects/${project.id}`)} 
                        }
                        >
                            <span className="project-title">{project.title}</span>
                            <button
                                className="project-actions"
                                onClick={(e) => {
                                e.stopPropagation()
                                setActiveProjectId(project.id)
                                setActionsOpenId(project.id)
                                }}
                            >
                                ⋯
                            </button>
                            {actionsOpenId === project.id && (
                            <div className="project-menu"
                                 onClick={(e) => e.stopPropagation()}
                            >
                            <button onClick={() => {openRenameModal(project)}}>✏️ Edit</button>
                            <button className="danger" onClick={() => {openDeleteModal(project)}}>
                                🗑️ Delete
                            </button>
                            </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            )}
        </aside>

    )

}

export default SideBar;