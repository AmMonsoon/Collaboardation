const express = require('express')
const router =  express.Router()
const { User, Project} = require('../models/Index')

//creates a new project

router.post('/:id', async(req, res) => {
    
    const userId =  req.params.id
    const { title } = req.body

    try {
        //checks if user exists
        const user = await User.findByPk(userId)
        if(!user){
            return res.status(404).json({message: "User does not exist"})
        }

        //checks if title field is valid
        if(!title || title.trim() === ""){
           return res.status(400).json({message: "Title required"})
        }

        const project = await Project.create( {
            title,
            userId
        })
        res.status(201).json(project) 
    } catch (error) {
        console.error("Failed to create project")
        res.status(500).json({message: "Failed to create project", error: error.message})
    }
});


//gets all projects for a specific user

// router.get('')

module.exports = router;