const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(payload, secret, {expiresIn: "1h"})
    return token
}

module.exports = { generateToken };