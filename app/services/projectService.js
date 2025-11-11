
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
        const projects =  await Project.findAll(
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

  updateProject: async (projectId, updateData) => {
        const [rows ,[updatedProject]] = await Project.update(updateData , { 
            where: {
                id: projectId,
            },
            returning: true
        })
        return updatedProject
  },

  deleteProject: async (projectId) => {
        const deletedUser = await Project.destroy({ where: { projectId } })
        return deletedUser
  },
};

module.exports = projectService;