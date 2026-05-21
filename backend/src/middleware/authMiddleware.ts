import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../lib/jwtToken";
import { unknown } from "zod";
export interface AuthRequest extends Request {
  user?: any;
}
export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token missing",
    });
  }

  try {
    const verifyToken = verifyJWT(token);

    req.user = verifyToken;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};
