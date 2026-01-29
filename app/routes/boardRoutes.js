const express = require('express')
const router = express.Router({mergeParams: true})
const { Project, Board } = require('../models/Index')
const boardController = require('../controllers/boardController')

const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')

const createBoardValidations = [validateId("projectId", "Project"), checkExists(Project, "Project"), requireOwnership(Project), validateTitle]
const getBoardValidations = [validateId("Board"), checkExists(Board, "Board"), requireOwnership(Board)]
const updateBoardValidations = [validateId("Board"), checkExists(Board, "Board"), requireOwnership(Board)]
const deleteBoardValidations = [validateId("Board"), checkExists(Board, "Board"), requireOwnership(Board)]

//create a board
router.post('/', auth, createBoardValidations,  asyncHandler(boardController.createBoard))
//get all boards that belongs to a project
router.get('/', auth, asyncHandler(boardController.getAllBoards))
//get a specific board
router.get('/:id', auth, getBoardValidations, asyncHandler(boardController.getBoard))
//update a board
router.patch('/:id', auth, updateBoardValidations, asyncHandler(boardController.updateBoard) )
//delete a board
router.delete('/:id', auth,  deleteBoardValidations, asyncHandler(boardController.deleteBoard))

module.exports = router;