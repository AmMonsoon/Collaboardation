const express = require('express')
const router =  express.Router()
const { User, Project} = require('../models/Index')
const {validateId, checkExists, validateTitle,} = require('../middleware')
const auth = require("../middleware/auth")
const projectController = require('../controllers/projectController')

const createProjectValidations = [validateTitle]
const updateProjectValidations = [validateId("Project"), checkExists(Project, "Project"), validateTitle]
const getProjectValidations = [validateId("Project"), checkExists(Project, "Project")]
const deleteProjectValidations = [validateId("Project"), checkExists(Project, "Project")]

//creates a new project
router.post('/', auth, createProjectValidations, projectController.createProject)
//gets one project
router.get('/:id',auth, getProjectValidations, projectController.getProject)
//gets all projects across all users
router.get('/',auth, projectController.getAllProjects)
//updates a specific project
router.patch('/:id',auth, updateProjectValidations, projectController.updateProject)
//delete a project
router.delete('/:id',auth, deleteProjectValidations, projectController.deleteProject)



module.exports = router;