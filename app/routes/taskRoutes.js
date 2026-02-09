const express = require('express')
const router = express.Router({mergeParams: true})

const { Board, Task, Project } = require('../models/Index')

const taskController = require('../controllers/taskController')

const {validateId, checkExists, validateTitle, requireOwnership, auth, asyncHandler} = require('../middleware')

//create a task
router.post('/',
    auth,
    validateId("projectId","Project"),
    checkExists("projectId", Project, "Project"),
    requireOwnership("projectId", Project),
    
    validateId("boardId","Board"),
    checkExists("boardId", Board, "Board"),
    
    validateTitle,
    asyncHandler(taskController.createTask))
//get all tasks
router.get('/',
    auth,
    validateId("projectId","Project"),
    checkExists("projectId", Project, "Project"),
    requireOwnership("projectId", Project),
    
    validateId("boardId","Board"),
    checkExists("boardId", Board, "Board"),
    asyncHandler(taskController.getTasks)
)

// //get a task
router.get('/:taskId',
    auth,
    validateId("projectId","Project"),
    checkExists("projectId", Project, "Project"),
    requireOwnership("projectId", Project),

    validateId("boardId","Board"),
    checkExists("boardId", Board, "Board"),

    validateId("taskId","Task"),
    checkExists("taskId", Task, "Task"),

    asyncHandler(taskController.getTaskById))
// //update a task
router.patch('/:taskId',
    auth,
    validateId("projectId","Project"),
    checkExists("projectId", Project, "Project"),
    requireOwnership("projectId", Project),

    validateId("boardId","Board"),
    checkExists("boardId", Board, "Board"),

    validateId("taskId","Task"),
    checkExists("taskId", Task, "Task"),
    asyncHandler(taskController.updateTask))
// //delete a task
router.delete('/:taskId',
    auth,
    validateId("projectId","Project"),
    checkExists("projectId", Project, "Project"),
    requireOwnership("projectId", Project),

    validateId("boardId","Board"),
    checkExists("boardId", Board, "Board"),

    validateId("taskId","Task"),
    checkExists("taskId", Task, "Task"),
    asyncHandler(taskController.deleteTask))
module.exports = router;