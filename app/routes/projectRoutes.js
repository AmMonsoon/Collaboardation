const express = require('express')
const router =  express.Router()
const { Project } = require('../models/Index')
const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')
const projectController = require('../controllers/projectController')
const boardController = require('../controllers/boardController')

const createProjectValidations = [validateTitle]
const updateProjectValidations = [validateId("projectId", "Project"), checkExists("projectId", Project, "Project"), validateTitle]
const getProjectValidations = [validateId("projectId", "Project"), checkExists("projectId", Project, "Project")]
const deleteProjectValidations = [validateId("projectId", "Project"), checkExists("projectId", Project, "Project")]

const createBoardValidations = [validateId("projectId", "Project"), checkExists("projectId", Project, "Project"), requireOwnership("projectId",Project), validateTitle]


//creates a new project
router.post('/', auth, createProjectValidations, asyncHandler(projectController.createProject))
//gets all projects the user owns
router.get('/', auth, asyncHandler(projectController.getAllProjects))
//gets one project
router.get('/:projectId',auth, getProjectValidations,requireOwnership("projectId",Project), asyncHandler(projectController.getProject))
//updates a specific project
router.patch('/:projectId',auth, updateProjectValidations, requireOwnership("projectId",Project), asyncHandler(projectController.updateProject))
//delete a project
router.delete('/:projectId',auth, deleteProjectValidations, requireOwnership("projectId",Project), asyncHandler(projectController.deleteProject))


//  #####Board Routes######
// //create a board
// router.post('/', auth, createBoardValidations,  asyncHandler(boardController.createBoard))
// //get all boards that belongs to a project
// router.get('/', auth, asyncHandler(boardController.getAllBoards))

module.exports = router;