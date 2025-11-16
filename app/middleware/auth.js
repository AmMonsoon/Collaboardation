const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    // 1️⃣ Extract token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attaches { id, email } from token

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