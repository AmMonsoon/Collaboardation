const express = require('express')
const router =  express.Router()
const { User } = require('../models/Index')

// testing router
// router.post('/users/:id', (req, res) => {
//   console.log('Body:', req.body);
//   console.log('Params:', req.params);
//   console.log('Query:', req.query);

//   res.send('Check your console!');
// });

router.post('/', async(req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user, ", error)
    res.status(500).json({ message: "Failed to create user, ", error: error.message})
  }
});


//finds all users
router.get('/', async(req, res) => {
  const users = await User.findAll();
  res.json(users);
});


// router.get()

module.exports = router;