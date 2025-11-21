const express = require('express')
const router =  express.Router()
const { User, Project} = require('../models/Index')
const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')
const projectController = require('../controllers/projectController')

const createProjectValidations = [validateTitle]
const updateProjectValidations = [validateId("Project"), checkExists(Project, "Project"), validateTitle]
const getProjectValidations = [validateId("Project"), checkExists(Project, "Project")]
const deleteProjectValidations = [validateId("Project"), checkExists(Project, "Project")]

//creates a new project
router.post('/', auth, createProjectValidations, asyncHandler(projectController.createProject))
//gets all projects the user owns
router.get('/', auth, asyncHandler(projectController.getAllProjects))
//gets one project
router.get('/:id',auth, getProjectValidations,requireOwnership(Project), asyncHandler(projectController.getProject))
//updates a specific project
router.patch('/:id',auth, updateProjectValidations, requireOwnership(Project), asyncHandler(projectController.updateProject))
//delete a project
router.delete('/:id',auth, deleteProjectValidations, requireOwnership(Project), asyncHandler(projectController.deleteProject))



module.exports = router;