const { registerUser } = require("../controllers/userController");
const { User } = require("../models/Index");

const userService = {
  registerUser: async (username, email, password) =>{
    
  },
  createUser: async (userData) => {
        const user = await User.create(userData)
        return user;
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