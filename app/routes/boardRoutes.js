const express = require('express')
const router = express.Router({mergeParams: true})
const { Project, Board } = require('../models/Index')
const boardController = require('../controllers/boardController')

const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')

const createBoardValidations = [validateTitle, validateId("projectId", "Project"), checkExists("projectId", Project, "Project"), requireOwnership("projectId",Project)]
const getBoardValidations = [validateId("projectId", "Project"), checkExists("projectId", Project, "Project"),validateId("boardId","Board"), checkExists("boardId",Board, "Board"), requireOwnership("projectId", Project)]
const updateBoardValidations = [validateId("projectId","Project"),checkExists("projectId", Project, "Project"), validateId("boardId", "Board"), checkExists("boardId", Board, "Board"), requireOwnership("projectId", Project)]
const deleteBoardValidations = [validateId("projectId","Project"),checkExists("projectId", Project, "Project"), validateId("boardId", "Board"), checkExists("boardId", Board, "Board"), requireOwnership("projectId", Project)]

//create a board
router.post('/', auth, createBoardValidations,  asyncHandler(boardController.createBoard))
//get all boards that belongs to a project
router.get('/', auth, requireOwnership("projectId", Project), asyncHandler(boardController.getAllBoards))
//get a specific board
router.get('/:boardId', auth, getBoardValidations, asyncHandler(boardController.getBoard))
//update a board
router.patch('/:boardId', auth, updateBoardValidations, asyncHandler(boardController.updateBoard) )
//delete a board
router.delete('/:boardId', auth,  deleteBoardValidations, asyncHandler(boardController.deleteBoard))

module.exports = router;