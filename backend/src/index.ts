import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import userRoutes from "./routes/userRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import { configurePassport } from "./utils/configurePassport";
import passport from "passport";
import session from "express-session";
import jwt from "jsonwebtoken";
import config from "../src/config/config";

console.log("Using database configuration:", config);

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "900mb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from the React frontend
    credentials: true,
  })
);

configurePassport();

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY || "secretKey", // Change this to a secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.send("testing node setUp!");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/booking", bookingRoutes);

app.get(
  "/api/v1/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    console.log("aaa2");
    var redirectUrl = ``;
    if ((req.user as any)?.message === "User does not exist") {
      redirectUrl = `${
        process.env.FRONTEND_URL
      }/authVerification?error=${encodeURIComponent("User does not exist")}`;
      return res.redirect(redirectUrl);
    }
    if (req.user) {
      const user = req.user as any;
      console.log("user", user);

      // Generate the token containing user details
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY || "secretKey", {
        expiresIn: "1h",
      });

      // Redirect the user with the token as a query parameter
      res.redirect(
        `${process.env.FRONTEND_URL}/authVerification?token=${token}`
      );
    } else {
      return res.redirect(
        `${process.env.FRONTEND_URL}/authVerification?error=Unknown error`
      );
    }
  }
);

app.get("/auth/google/failure", (req: Request, res: Response) => {
  res.status(401).send("Google authentication failed");
});

app.get("/auth/google/success", (req: Request, res: Response) => {
  console.log("Google authentication successful");
  res.status(200).send("Google authentication successful");
});

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
