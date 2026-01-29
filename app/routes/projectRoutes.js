const express = require('express')
const router =  express.Router()
const { Project } = require('../models/Index')
const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')
const projectController = require('../controllers/projectController')
const boardController = require('../controllers/boardController')

const createProjectValidations = [validateTitle]
const updateProjectValidations = [validateId("Project"), checkExists(Project, "Project"), validateTitle]
const getProjectValidations = [validateId("Project"), checkExists(Project, "Project")]
const deleteProjectValidations = [validateId("Project"), checkExists(Project, "Project")]

const createBoardValidations = [validateId("Project"), checkExists(Project, "Project"), requireOwnership(Project), validateTitle]


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


//  #####Board Routes######
// //create a board
// router.post('/', auth, createBoardValidations,  asyncHandler(boardController.createBoard))
// //get all boards that belongs to a project
// router.get('/', auth, asyncHandler(boardController.getAllBoards))

module.exports = router;