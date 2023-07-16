
import cookie,{ serialize } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/user-schema.js";

    dotenv.config();

    export const cookieSetter = (res, token, set) => {
        const domain = '.code-editor-deploy.onrender.com'; // Replace with your domain
        const serializedCookie = cookie.serialize('token', set ? token : "", {
          path: '/',
          httpOnly: true,
          maxAge: set ? 24 * 60 * 60 * 1000 : 0,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          secure: process.env.NODE_ENV === 'production',
          domain: process.env.NODE_ENV === 'production' ? domain : undefined
        });
        res.setHeader('Set-Cookie', serializedCookie);
        const setCookieHeader = res.getHeader('Set-Cookie');
    };


    export const generateToken = (_id) => {
        return jwt.sign({ _id }, process.env.JWT_SECRET);
    };

    export const checkAuth = async (req) => {
        const cookie = req.headers.cookie;
        let tokenValue = null;
        const cookieArray = cookie.split(';');

        for (const cookie of cookieArray) {
            const [key, value] = cookie.trim().split('=');
            if (key === 'token') {
              tokenValue = value;
              break;
            }
          }

        console.log(cookie);
        if (!tokenValue) return null;
      
        const token = tokenValue;
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        return await User.findById(decoded._id);
    };
    