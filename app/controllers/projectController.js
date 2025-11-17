const projectService = require("../services/projectService")
const userService = require("../services/userService")
const projectController = {

 

    //CREATE A PROJECT
    createProject: async(req, res, next) => {
        const userId = req.user.id
        const { title } = req.body

        try {
            const project = await projectService.createProject(userId,title)
            res.status(201).json({
                success: true,
                message: "New Project Created",
                data: { project }
            }) 
        } catch (error) {
            next(error)      
        }
    },

    //GETS ONE PROJECT
    getProject:  async(req, res, next) => {
        try {
            const projectId = req.record.id
            const project = await projectService.getProjectById(projectId)
            res.status(200).json(project)
        } catch (error) {
            next(error)
        }
    },
    //GETS ALL PROJECTS OWNED BY USER
    getAllProjects: async(req, res, next) => {
        try {
            let userId = req.user.id
            let allProjects = await projectService.getProjectsByUser(userId)
            res.status(200).json(allProjects)
        } catch (error) {
            next(error)
        }
    },
    //UPDATES A SPECIFIC PROJECT
    updateProject: async(req, res, next) => {
        try {
            let projectId = req.record.id  //req.record comes from requireOwnership middleware

            const updatedProject = await projectService.updateProject(projectId, req.body)
            res.status(200).json({message: "Project Successfully Updated",updatedProject})
        } catch (error) {
            next(error)
        }
    },
    //DELETE A PROJECT
    deleteProject: async(req, res, next) => {
      try {
        let projectId = req.record.id
        await projectService.deleteProject(projectId)
        res.status(200).json({success: true, message: "Project Deleted", id: projectId})
      } catch (error) {
            next(error)
      }
    }
    
}
module.exports = projectController;