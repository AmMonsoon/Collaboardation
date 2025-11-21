const express = require('express')
const router =  express.Router()
const { User } = require('../models/Index')
const userController =  require('../controllers/userController')
const {auth, asyncHandler, validateId, checkExists, validateEmail, duplicateEmail, checkUserFields, checkRequestBody} = require('../middleware/index')

const userIdValidations = [ validateId("User"), checkExists(User, "User")]
const userEmailValidations = [validateEmail, duplicateEmail]

//registers a user
router.post('/register', checkUserFields, validateEmail, duplicateEmail, asyncHandler(userController.registerUser))
//login a user
router.post('/me', auth, userController.getLoggedInUser)
router.post('/login', checkRequestBody, validateEmail, asyncHandler(userController.authenticateUser))
//finds all users
router.get('/', asyncHandler(userController.getAllUsers))
//gets all projects for a specific user
router.get('/:id/projects', userIdValidations, asyncHandler(userController.getUserById))
//find a specific user
router.get('/:id', userIdValidations, asyncHandler(userController.getUserById))
//updates an existing user
router.patch('/:id',...userIdValidations, checkRequestBody, ...userEmailValidations, asyncHandler(userController.updateUser))
//delete an existing user
router.delete('/:id',userIdValidations, asyncHandler(userController.deleteUser))




module.exports = router;