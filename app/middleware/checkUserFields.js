
const checkUserFields = (req, res, next) => {

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
    next()
}

module.exports = checkUserFields;