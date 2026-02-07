const express = require('express')
const router = express.Router({mergeParams: true})

const { Board, Task } = require('../models/Index')

const taskController = require('../controllers/taskController')

const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')

//create a task
router.post('/',
    auth,
    validateTitle,
    validateId("boardId","Board"),
    checkExists("boardId", Board, "Board"),
    requireOwnership("boardId", Board),
    asyncHandler(taskController.createTask))
//get all tasks
// router.get('/', "middleware", asyncHandler(taskController.getTasks))
// //get a task
// router.get('/:taskId', "middleware", asyncHandler(taskController.getTaskById))
// //update a task
// router.patch('/:taskId', "middleware", asyncHandler(taskController.updateTask))
// //delete a task
// router.delete('/:taskId', "middleware", asyncHandler(taskController.deleteTask))

module.exports = router;