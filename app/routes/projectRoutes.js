const express = require('express')
const router =  express.Router()
const { User, Project} = require('../models/Index')
const {validateId, checkExists, validateTitle, requireOwnership} = require('../middleware')
const auth = require("../middleware/auth")
const projectController = require('../controllers/projectController')

const createProjectValidations = [validateTitle]
const updateProjectValidations = [validateId("Project"), checkExists(Project, "Project"), validateTitle]
const getProjectValidations = [validateId("Project"), checkExists(Project, "Project")]
const deleteProjectValidations = [validateId("Project"), checkExists(Project, "Project")]

//creates a new project
router.post('/', auth, createProjectValidations, projectController.createProject)
//gets all projects the user owns
router.get('/', auth, projectController.getAllProjects)
//gets one project
router.get('/:id',auth, getProjectValidations,requireOwnership(Project), projectController.getProject)
//updates a specific project
router.patch('/:id',auth, updateProjectValidations, requireOwnership(Project), projectController.updateProject)
//delete a project
router.delete('/:id',auth, deleteProjectValidations, requireOwnership(Project), projectController.deleteProject)



module.exports = router;