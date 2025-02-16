import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access Denied: No Token Provided" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || ""
    ) as JwtPayload;
    req.user = verified; // Store the verified payload in req.user
    console.log("Verified Token Payload:", verified);
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default verifyToken;
