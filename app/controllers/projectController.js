const {User, Project} = require("../models/Index")

const projectController = {

    //CREATE A PROJECT
    createProject: async(req, res) => {
        
        //checks if id parameter is valid
        const userId = parseInt(req.params.id, 10);
        if(isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: "Invalid project ID" });
        }
        const { title } = req.body

        try {
            //checks if user exists
            const user = await User.findByPk(userId)
            if(!user){
                return res.status(404).json({message: "User does not exist"})
            }

            //checks if title field is valid
            if(!title || title.trim() === ""){
            return res.status(400).json({message: "Title required"})
            }

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
        //checks if id parameter is valid
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId) || projectId <= 0) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
        //checks if project exists
        let project = await Project.findByPk(projectId)
    
        if(!project){
            return res.status(400).json({message: "Project does not exist"})
        }
    
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
            //checks if id parameter is valid
            const projectId = parseInt(req.params.id, 10);
            if(isNaN(projectId) || projectId <= 0) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
            //check if project exists
            let project = await Project.findByPk(projectId)
    
            if(!project){
                return res.status(400).json({message: "Project does not exist"})
            }
            //check if title is valid and not an empty string
            let {title} = req.body
            if(!title || title.trim() === ""){
                return res.status(400).json({message: "Title must be valid"})
            }
    
            const updatedProject = await Project.update({title}, {where: {id: projectId}})
            res.status(200).json({message: "Project Successfully Updated",updatedProject})
        } catch (error) {
            console.error("Failed to update project")
            res.status(500).json({message: "Failed to update project", error: error.message})
        }
    },
    //DELETE A PROJECT
    deleteProject: async(req, res) => {
      try {
        //checks if id parameter is valid
        const projectId = parseInt(req.params.id, 10);
        if(isNaN(projectId) || projectId <= 0) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
        const project = await Project.findByPk(projectId)
        //checks if project exists
        if(!project){
          res.status(404).json({ message: "Project does not exist"})
        }
        Project.destroy({where:{id: projectId}})
        res.status(200).json({message: "Project Deleted"})
      } catch (error) {
        console.error("Failed to delete project", error);
        res.status(500).json({ message: "Failed to delete project", error: error.message})
      }
    }
    

}
module.exports = projectController;