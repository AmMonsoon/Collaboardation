const { User, Project } = require('../models/Index')
const { getProject } = require('./projectController')

const userController = {
    createUser: async(req, res) => {
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
        const existingEmail = await User.findOne({where: {email}})
        if(existingEmail){
        return res.status(409).json({ message: "Duplicate email"})
        }
        //creates new user
        const user = await User.create(req.body)
        res.status(201).json({message: "New User Created", user});
        }catch (error) {
        console.error("Failed to create user, ", error)
        res.status(500).json({ message: "Failed to create user, ", error: error.message})
        }
    },
    getAllUsers: async(req,res) => {
        try{
        const users = await User.findAll();
        res.status(200).json(users);
        }
        catch(error){
        console.error("Failed to find users", error);
        res.status(500).json({ message: "Failed to retrieve users, ", error: error.message})
        }
    },
    getProjectsForUser: async(req, res) => {
        try {
            let userId = req.params.id
            let projects = await Project.findAll({where: {userId}})
            res.status(200).json(projects)
        }catch (error) {
            console.error("Failed to retrieve projects for a specific user", error);
            res.status(500).json({ message: "Failed to retrieve projects for a specific user", error: error.message})
        }   
    },
    getUser: async(req, res) => {
        try {
            const user = req.model
            res.status(200).json(user)
        } catch (error) {
            console.error("Failed to find user", error);
            res.status(500).json({ message: "Failed to retrieve user, ", error: error.message})
        }
    },
    updateUser: async(req, res) => {
        try {
            const user = req.model  //comes from middleware/checkExists
            const dataToBeUpdated = req.body
            
            //checks if body is not empty
            if(Object.keys(req.body).length === 0){
            res.status(400).json({message: "No fields provided to update"})
            }
            
            const updatedUser = await User.update( dataToBeUpdated, { where: {id: user.id}})
            res.status(200).json({message: "User Updated Successfully" , updatedUser})
        }catch (error) {
            console.error("Failed update user", error);
            res.status(500).json({ message: "Failed to update user, ", error: error.message})
        }
    },
    deleteUser: async(req,res) => {
        try { 
            User.destroy( {where: {id: req.params.id}})
            res.status(200).json({message: "User deleted"})
        }catch (error) {
            console.error("Failed to delete user", error);
            res.status(500).json({ message: "Failed to delete user", error: error.message})
        }
    }   
}

module.exports = userController;