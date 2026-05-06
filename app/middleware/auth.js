const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    
    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedError("Missing authentication token");
    }


    // 2️⃣ Verify token
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attaches { id, email } from token

    if(!req.user){
      throw new UnauthorizedError("User no longer exists")
    }
    
    // 3️⃣ Attach user info from payload
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    // 4️⃣ Continue to route
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

module.exports = auth;