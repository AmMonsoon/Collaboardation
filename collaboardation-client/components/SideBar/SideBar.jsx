import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProjects } from "../../src/api/projectApi";
import "./SideBar.css"

const SideBar = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()


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