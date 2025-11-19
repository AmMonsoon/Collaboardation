const { UnauthorizedError, NotFoundError, ConflictError  } = require("../errors/index");
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
  authenticateUser: async (userData) => {
    const {email, password} = userData
    const user = await User.findOne({
        where: { email },
        attributes: {include: ["password"]}
    })

    if(!user){
        throw new UnauthorizedError("Invalid Credentials")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new UnauthorizedError("Invalid Credentials")
    }
    return user
  },
  getAllUsers: async () => {  
        const users =  await User.findAll()
        return users
  },

  getUserById: async (id) => {
        const user = await User.findByPk(id)
        if(!user)throw new NotFoundError("User not found")
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