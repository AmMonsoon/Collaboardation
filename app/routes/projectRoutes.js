const express = require('express')
const router =  express.Router()
const { User, Project} = require('../models/Index')
const projectController = require('../controllers/projectController')


//creates a new project
router.post('/:id', projectController.createProject)
//gets one project
router.get('/:id', projectController.getProject)
//gets all projects across all users
router.get('/', projectController.getAllProjects)
//updates a specific project
router.patch('/:id', projectController.updateProject)
//delete a project
router.delete('/:id', projectController.deleteProject)



module.exports = router;