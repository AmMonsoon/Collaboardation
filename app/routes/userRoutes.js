const express = require('express')
const router =  express.Router()
const { User } = require('../models/Index')

//testing router
router.post('/users/:id', (req, res) => {
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  console.log('Query:', req.query);

  res.send('Check your console!');
});


//creates a new user
router.post('/', async(req, res) => {
  try {
    const user = await User.create(req.body)
    console.log("&&&&&&&&&&&&&&&&&&&&", user)
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
    console.log(req.params)
    const user = await User.findByPk(req.params.id)
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
    const dataToBeUpdated = req.body
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
    User.destroy( {where: {id: req.params.id}})
    res.status(204).send()
  } catch (error) {
    console.error("Failed to delete user", error);
    res.status(500).json({ message: "Failed to delete user, ", error: error.message})
  }
})


module.exports = router;