const {User, Project} = require("../models/Index")

const projectController = {

    //CREATE A PROJECT
    createProject: async(req, res) => {
        const userId = req.model.id
        const { title } = req.body

        try {
            const project = await Project.create( {
                title,
                userId
            })
            res.status(201).json({message: "New Project Created", project}) 
        } catch (error) {
            console.error("Failed to create project")
            res.status(500).json({message: "Failed to create project", error: error.message})
        }
    },

    //GETS ONE PROJECT
    getProject:  async(req, res) => {
        try {
            const project = req.model
            res.status(200).json(project)
        } catch (error) {
            console.error("Failed to retrieve project")
            res.status(500).json({message: "Failed to retrieve project", error: error.message})
        }
    },
    //GETS ALL PROJECTS ACROSS ALL USERS
    getAllProjects: async(req, res) => {
        try {
            let allProjects = await Project.findAll()
            res.status(200).json(allProjects)
        } catch (error) {
            console.error("Failed to retrieve projects")
            res.status(500).json({message: "Failed to retrieve projects", error: error.message})
        }
    },
    //UPDATES A SPECIFIC PROJECT
    updateProject: async(req, res) => {
        try {
            let project = req.model  //req.model comes from checkExists middleware
            let {title} = req.body

            const updatedProject = await Project.update({title}, {where: {id: project.id}})
            res.status(200).json({message: "Project Successfully Updated",updatedProject})
        } catch (error) {
            console.error("Failed to update project")
            res.status(500).json({message: "Failed to update project", error: error.message})
        }
    },
    //DELETE A PROJECT
    deleteProject: async(req, res) => {
      try {
        Project.destroy({where:{id: req.params.id}})
        res.status(200).json({message: "Project Deleted"})
      } catch (error) {
        console.error("Failed to delete project", error);
        res.status(500).json({ message: "Failed to delete project", error: error.message})
      }
    }
    

}
module.exports = projectController;