const { User, Project } = require('../models/Index')
const { ConflictError, BadRequestError } = require('../errors/index')

const userController = {
    createUser: async(req, res, next) => {
        try {
            const user = await User.create(req.body)
            res.status(201).json({message: "New User Created", user});
        }catch (error) {
            if(error.name === "SequelizeValidationError"){
                return next(new BadRequestError(error.message));
            }
            return next(error)
        }
    },
    getAllUsers: async(req, res, next) => {
        try{
        const users = await User.findAll();
        res.status(200).json(users);
        }
        catch(error){
            next(error)
        }
    },
    getProjectsForUser: async(req, res, next) => {
        try {
            let userId = req.params.id
            let projects = await Project.findAll({where: {userId}})
            res.status(200).json(projects)
        }catch (error) {
            next(error)
            // console.error("Failed to retrieve projects for a specific user", error);
            // res.status(500).json({ message: "Failed to retrieve projects for a specific user", error: error.message})
        }   
    },
    getUser: async(req, res, next) => {
        try {
            const user = req.model
            res.status(200).json(user)
        } catch (error) {
            next(error)
            // console.error("Failed to find user", error);
            // res.status(500).json({ message: "Failed to retrieve user, ", error: error.message})
        }
    },
    updateUser: async(req, res, next) => {
        try {
            const user = req.model  //comes from middleware/checkExists
            const dataToBeUpdated = req.body

            const updatedUser = await User.update( dataToBeUpdated, { where: {id: user.id}})
            res.status(200).json({message: "User Updated Successfully" , updatedUser})
        }catch (error) {
            next(error)
            // console.error("Failed update user", error);
            // res.status(500).json({ message: "Failed to update user, ", error: error.message})
        }
    },
    deleteUser: async(req,res, next) => {
        try { 
            User.destroy( {where: {id: req.params.id}})
            res.status(200).json({message: "User deleted"})
        }catch (error) {
            next(error)
            // console.error("Failed to delete user", error);
            // res.status(500).json({ message: "Failed to delete user", error: error.message})
        }
    }   
}

module.exports = userController;