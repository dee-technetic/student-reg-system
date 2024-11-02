import jwt from "jsonwebtoken";
import httpStatus from "http-status";

const  authorizeUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "error",
      message: "No token provided!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};

export {authorizeUser}