import { Request, Response, NextFunction } from "express";

const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any; // Assuming user is attached to req in a previous middleware

    if (user && user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Access is denied." });
    }
  };
};

export default checkRole;
