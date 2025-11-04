const express = require('express')
const router =  express.Router()
const { User, Project } = require('../models/Index')
const userController =  require('../controllers/userController')
const {validateId, checkExists, validateEmail, duplicateEmail, checkUserFields, checkRequestBody} = require('../middleware/index')

const userIdValidations = [ validateId("User"), checkExists(User, "User")]
const userEmailValidations = [validateEmail, duplicateEmail]

//creates a new user
router.post('/', checkUserFields, userEmailValidations, userController.createUser)
//finds all users
router.get('/', userController.getAllUsers)
//gets all projects for a specific user
router.get('/:id/projects', userIdValidations, userController.getProjectsForUser)
//find a specific user
router.get('/:id', userIdValidations, userController.getUser)
//updates an existing user
router.patch('/:id',...userIdValidations, checkRequestBody, ...userEmailValidations, userController.updateUser)
//delete an existing user
router.delete('/:id',userIdValidations, userController.deleteUser)




module.exports = router;