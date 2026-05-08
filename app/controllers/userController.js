const userService = require("../services/userService");
const { generateToken } = require("../utils/jwt");

const userController = {
       //REGISTER USER
    registerUser: async(req, res) => {

            const data = req.body
            const newUser = await userService.registerUser(data)
            const token = generateToken(newUser)
            // Return safe fields only
            const safeUser = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
                
            };

            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "lax"
            })
            .status(201)
            .json({
                success: true,
                message: "User Registered Successfully",
                data: { safeUser }
            })
    },
  //AUTHENTICATE USER
  authenticateUser: async (req, res) => {
    const {email, password} = req.body
    const authenticatedUser = await userService.authenticateUser({email, password})
        const token = generateToken(authenticatedUser)

        const safeUser = {
                id: authenticatedUser.id,
                username: authenticatedUser.username,
                email: authenticatedUser.email,
                avatar: authenticatedUser.avatar
                
        };
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, // true in production
          sameSite: "lax",
        })
        .status(200)
        .json({
          success: true,
          message: "Login Successful",
          data: { safeUser }
        })
  },
  getLoggedInUser: async (req, res) => {
      safeUser = {
        id: req.user.id,
        email: req.user.email
      }
      res.status(200).json({
        success: true,
        data: { safeUser }
      })

  },
  // Get all users (safe fields ONLY)
  getAllUsers: async (req, res) => {
      const users = await userService.getAllUsers();

      const safeUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }));

      res.status(200).json(safeUsers);
    
  },

  // Get one user by ID (full details)
  getUserById: async (req, res) => {
      const user = await userService.getUserById(req.params.id);

      const safeUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      };

      res.status(200).json(safeUser);
  },

  // Update a user (return updated user - safe fields)
  updateUser: async (req, res) => {
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
  },

  // Delete a user
  deleteUser: async (req, res) => {
      await userService.deleteUser(req.params.id);
      res.status(200).json({
        message: "User deleted successfully"
      });
  },

  logoutUser: async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Successful"
    })
  }
};

module.exports = userController;