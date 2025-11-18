const express = require('express')
const router =  express.Router()
const auth = require("../middleware/auth")
const { User } = require('../models/Index')
const userController =  require('../controllers/userController')
const {validateId, checkExists, validateEmail, duplicateEmail, checkUserFields, checkRequestBody} = require('../middleware/index')

const userIdValidations = [ validateId("User"), checkExists(User, "User")]
const userEmailValidations = [validateEmail, duplicateEmail]

//registers a user
router.post('/register', checkUserFields, validateEmail, duplicateEmail, userController.registerUser)
//login a user
router.post('/me', auth, userController.getLoggedInUser)
router.post('/login', checkRequestBody, validateEmail, userController.authenticateUser)
//finds all users
router.get('/', userController.getAllUsers)
//gets all projects for a specific user
router.get('/:id/projects', userIdValidations, userController.getUserById)
//find a specific user
router.get('/:id', userIdValidations, userController.getUserById)
//updates an existing user
router.patch('/:id',...userIdValidations, checkRequestBody, ...userEmailValidations, userController.updateUser)
//delete an existing user
router.delete('/:id',userIdValidations, userController.deleteUser)




module.exports = router;