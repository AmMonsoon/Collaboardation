const projectService = require("../services/projectService")
const userService = require("../services/userService")
const projectController = {

 

    //CREATE A PROJECT
    createProject: async(req, res, next) => {
        const userId = 1
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
            const projectId = req.model.id
            const project = projectService.getProjectById(projectId)
            res.status(200).json(project)
        } catch (error) {
            next(error)
        }
    },
    //GETS ALL PROJECTS ACROSS ALL USERS
    getAllProjects: async(req, res, next) => {
        try {
            let userId = req.params.id
            let allProjects = await projectService.getProjectsByUser(userId)
            res.status(200).json(allProjects)
        } catch (error) {
            next(error)
        }
    },
    //UPDATES A SPECIFIC PROJECT
    updateProject: async(req, res, next) => {
        try {
            let projectId = req.model.id  //req.model comes from checkExists middleware
            let {title} = req.body

            const updatedProject = await projectService.updatedProject(projectId, title)
            res.status(200).json({message: "Project Successfully Updated",updatedProject})
        } catch (error) {
            next(error)
        }
    },
    //DELETE A PROJECT
    deleteProject: async(req, res, next) => {
      try {
        let projectId = req.model.id
        await projectService.deleteProject(projectId)
        res.status(200).json({message: "Project Deleted"})
      } catch (error) {
            next(error)
      }
    }
    

}
module.exports = projectController;