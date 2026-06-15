const projectService = require("../services/projectService")
const projectController = {

 

    //CREATE A PROJECT
    createProject: async(req, res) => {
        const userId = req.user.id
        const { title } = req.body

            const project = await projectService.createProject(userId,title)
            res.status(201).json({
                success: true,
                message: "New Project Created",
                data: { project }
            }) 
       
    },

    //GETS ONE PROJECT
    getProject:  async(req, res) => {
            const projectId = req.record.id
            const project = await projectService.getProjectById(projectId)
            res.status(200).json(project)
    
    },
    //GETS ALL PROJECTS OWNED BY USER
    getAllProjects: async(req, res) => {
        
            let userId = req.user.id
            let allProjects = await projectService.getProjectsByUser(userId)
            res.status(200).json(allProjects)
        
    },
    //UPDATES A SPECIFIC PROJECT
    updateProject: async(req, res) => {

            let projectId = req.record.id  //req.record comes from requireOwnership middleware
            const updatedProject = await projectService.updateProject(projectId, req.body)
            
            res.status(200).json({message: "Project Successfully Updated",updatedProject})
       
    },
    //DELETE A PROJECT
    deleteProject: async(req, res) => {
      
        let projectId = req.record.id
        await projectService.deleteProject(projectId)
        res.status(200).json({success: true, message: "Project Deleted", id: projectId})
      
    }
    
}
module.exports = projectController;