const express = require('express')
const router =  express.Router()
const { User, Project } = require('../models/Index')
const userController =  require('../controllers/userController')


//creates a new user
router.post('/', userController.createUser)
//finds all users
router.get('/', userController.getAllUsers)
//gets all projects for a specific user
router.get('/:id/projects', userController.getProjectsForUser)
//find a specific user
router.get('/:id', userController.getUser)
//updates an existing user
router.patch('/:id', userController.updateUser)
//delete an existing user
router.delete('/:id', userController.deleteUser)




module.exports = router;