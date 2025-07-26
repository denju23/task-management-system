import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import ApiError from '../utils/ApiError.js';


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization token missing or malformed'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // this might contain userId, role etc.
    next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

export default authMiddleware;
