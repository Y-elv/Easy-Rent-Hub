import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleOAuth2Strategy } from "passport-google-oauth2";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


export const configurePassport = () => {
  dotenv.config();
  console.log(process.env.HOST);
  const url = process.env.HOST || "http://localhost:8000";
  const callbackURL = `${url}/auth/google/callback`;

  console.log("Using URL:", url);
  console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
  console.log("process.env.JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
  console.log("Callback URL:", callbackURL);

interface IUserPayload {
    email: string;
    role: string;
    [key: string]: any;
}

interface IResponse {
    message: string;
    token: string;
    user: IUserPayload;
}

passport.use(
    new GoogleOAuth2Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: callbackURL,
            passReqToCallback: true,
        },
        async (
            request: Request,
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: (error: any, user?: any, info?: any) => void
        ) => {
            try {
                const userEmail: string = profile.email;
                console.log("User Email:", userEmail);

                let user = await User.findOne({ where: { email: userEmail } });
                let role: string = "";

                if (user) {
                    role = "Renters";
                }

                if (user) {
                    const payload: IUserPayload = {
                        ...user.toJSON(),
                        role: role,
                    };

                    console.log("user", user);

                    const token: string = jwt.sign(
                        payload,
                        process.env.JWT_SECRET_KEY || "secretKey",
                        { expiresIn: "1h" }
                    );

                    const response: IResponse = {
                        message: "Login successful",
                        token,
                        user: payload,
                    };
                    console.log("aaa1");
                    return done(null, response);
                } else {
                    console.log("User does not exist");
                    return done(null, { message: "User does not exist" });
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};
