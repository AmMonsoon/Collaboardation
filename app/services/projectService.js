const {NotFoundError} = require("../errors/index")
const { Project } = require("../models/Index");

const projectService = {
  createProject: async (userId, title) => {
        const project = await Project.create({
            userId,
            title    
        })
        return project;
  },

  getProjectsByUser: async (userId) => {  
        const projects = await Project.findAll(
            { where:{ 
                userId
              }
            })
        return projects
  },

  getProjectById: async (projectId) => {
        const project = await Project.findByPk(projectId)
        if (!project) throw new NotFoundError("Project not found")
        return project
  },

  updateProject: async (projectId, updateFields) => {
        
        const [rows , updatedProject] = await Project.update(updateFields , { 
            where: {
                id: projectId,
            },
            returning: true
        })
        if(!updatedProject) throw new NotFoundError("Project not found")
        return updatedProject
  },

  deleteProject: async (projectId) => {
        const deletedProject = await Project.destroy({ where: { id: projectId }  })
        if(!deletedProject) throw new NotFoundError("Project not found")
        return deletedProject
  },
};

module.exports = projectService;