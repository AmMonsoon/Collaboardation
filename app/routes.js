import { Router } from "express"

const router = Router()
// respond with "home page" when a GET request is made to the homepage
router.get('/', (req, res) => {
  res.send('home page')
})

// get all users
router.get('/users', (req, res) => {
  res.send(req.params)
})

//get a specific user
router.get('/users/userId', (req, res) => {
  res.send(req.params)
})

//get all the projects of a specific user
router.get('/users/userId/projects', (req, res) => {
  res.send(req.params)
})

//get a specific project of a specific user
router.get('/users/userId/projects/projectId', (req, res) => {
  res.send(req.params)
})