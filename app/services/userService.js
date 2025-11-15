const { registerUser } = require("../controllers/userController");
const ConflictError = require("../errors/ConflictError");
const { User } = require("../models/Index");
const bcrypt = require("bcrypt")

const userService = {
  registerUser: async (userData) =>{
    const {username, email, password, avatar} = userData
    const existingUser = await User.findOne({ where: { email } })
    if(existingUser){
        throw new ConflictError("Email already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const registerUser = await User.create({
        username,
        email,
        password: hashedPassword,
        avatar
    })
    return registerUser
  },
  getAllUsers: async () => {  
        const users =  await User.findAll()
        return users
  },

  getUserById: async (id) => {
        const user = await User.findByPk(id)
        return user
  },

  updateUser: async (id, updateData) => {
        const [rows ,[updatedUser]] = await User.update(updateData , { 
            where: {
                id: id,
            },
            returning: true
        })
        return updatedUser
  },

  deleteUser: async (id) => {
        const deletedUser = await User.destroy({ where: { id } })
        return deletedUser
  },
};

module.exports = userService;