import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  // Get the token from cookies or Authorization header
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return an unauthorized error
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded; // typically contains `id` or other user details

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // If token verification fails, return an unauthorized error
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default authMiddleware;
