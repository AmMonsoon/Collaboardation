const userService = require("../services/userService");
const { generateToken } = require("../utils/jwt");

const userController = {
       //REGISTER USER
    registerUser: async(req, res, next) => {
        try {
            const data = req.body
            const user = await userService.registerUser(data)
            // Return safe fields only
            const safeUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            };

            res.status(201).json({
                success: true,
                message: "User Registered Successfully",
                data: { safeUser }
            })
        } catch (error) {
            next(error)
        }
    },
  //AUTHENTICATE USER
  authenticateUser: async (req, res, next) => {
    try {
        const {email, password} = req.body
        const authenticatedUser = await userService.authenticateUser({email, password})
        const token = generateToken(authenticatedUser)

        const safeUser = {
                id: authenticatedUser.id,
                username: authenticatedUser.username,
                email: authenticatedUser.email,
                avatar: authenticatedUser.avatar
        };
        res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                data: { safeUser }
            })
    } catch (error) {
        next(error)
    }
  },
  getLoggedInUser: async (req, res, next) => {
    try {
      safeUser = {
        id: req.user.id,
        email: req.user.email
      }
      res.status(200).json({
        success: true,
        data: safeUser
      })
    } catch (error) {
      next(error)
    }

  },
  // Get all users (safe fields ONLY)
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();

      const safeUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }));

      res.status(200).json(safeUsers);
    } catch (error) {
      next(error);
    }
  },

  // Get one user by ID (full details)
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);

      const safeUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      };

      res.status(200).json(safeUser);
    } catch (error) {
      next(error);
    }
  },

  // Update a user (return updated user - safe fields)
  updateUser: async (req, res, next) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);

      const safeUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar
      };

      res.status(200).json({
        message: "User updated successfully",
        user: safeUser
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete a user
  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.id);

      res.status(200).json({
        message: "User deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;