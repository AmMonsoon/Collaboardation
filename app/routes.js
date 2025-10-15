const express = require('express')
const app = express()

// respond with "home page" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('home page')
})
// get all users
app.get('/users', (req, res) => {
  res.send(req.params)
})
//get a specific user
app.get('/users/userId', (req, res) => {
  res.send(req.params)
})
//get all the projects of a specific user
app.get('/users/userId/projects', (req, res) => {
  res.send(req.params)
})

//get a specific project of a specific user
app.get('/users/userId/projects/projectId', (req, res) => {
  res.send(req.params)
})