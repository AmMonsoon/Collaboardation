const express = require('express')
const router =  express.Router()
const { User } = require('../models/Index')



//creates a new user
router.post('/', async(req, res) => {
  try {
    const {username, email} = req.body
    //username required and cannot be an empty string
    if(!username || username.trim() === ""){
      console.log("username is required")
      res.status(400).json({ message: " Username required"})
    }
    // checks for email and cannot be an empty string
    if(!email || email.trim() === ""){
    console.log("email is required")
    res.status(400).json({ message: " Email required"})
    }

    //checks for valid email format
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)){
      return res.status(400).json({ message: "Invalid email format"})
    }
    //checks for a duplicate email
    const existingEmail = User.findOne({where: {email: email}})
    if(existingEmail){
      return res.status(409).json({ message: "Duplicate email"})
    }
    //creates new user
    const user = await User.create(req.body)
    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user, ", error)
    res.status(500).json({ message: "Failed to create user, ", error: error.message})
  }
});

//finds all users
router.get('/', async(req, res) => {
  try{
    const users = await User.findAll();
    res.status(200).json(users);
  }
  catch(error){
    console.error("Failed to find users", error);
    res.status(500).json({ message: "Failed to retrieve users, ", error: error.message})

  }
});


//find a specific user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if(!user){
      res.status(404).json({ message: "User does not exist"})
    }
    res.status(200).json(user)
  } catch (error) {
    console.error("Failed to find user", error);
    res.status(500).json({ message: "Failed to retrieve user, ", error: error.message})
  }
})


//updates an existing user
router.patch('/:id', async(req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    const {email} = req.body
    const dataToBeUpdated = req.body
    //checks is user exists
    if(!user){
      res.status(404).json({ message: "User does not exist"})
    }
    //checks if body is not empty
    if(Object.keys(req.body).length === 0){
      res.status(400).json({message: "No fields provided to update"})
    }

    //checks for valid email 
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)){
      return res.status(400).json({ message: "Invalid email format"})
    }
    //checks for duplicate email
    const existingEmail = User.findOne({where: {email: email}})
    if(existingEmail){
      return res.status(409).json({ message: "Duplicate email"})
    }

    const updatedUser = await User.update( dataToBeUpdated, { where: {id: user.id}})
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Failed update user", error);
    res.status(500).json({ message: "Failed to update user, ", error: error.message})
  }
})

//delete an existing user

router.delete('/:id', async(req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if(!user){
      res.status(404).json({ message: "User does not exist"})
    }
    User.destroy( {where: {id: req.params.id}})
    res.status(204).send()
  } catch (error) {
    console.error("Failed to delete user", error);
    res.status(500).json({ message: "Failed to delete user, ", error: error.message})
  }
})


module.exports = router;