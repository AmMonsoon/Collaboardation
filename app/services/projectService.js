
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
        return project
  },

  updateProject: async (projectId, updateFields) => {
        
        const [rows , updatedProject] = await Project.update(updateFields , { 
            where: {
                id: projectId,
            },
            returning: true
        })
        return updatedProject
  },

  deleteProject: async (projectId) => {
        const deletedProject = await Project.destroy({ where: { id: projectId }  })
        return deletedProject
  },
};

module.exports = projectService;