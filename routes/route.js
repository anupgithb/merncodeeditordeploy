import express from "express";

const router = express.Router();


import { CodeCompile } from "../controller/code.js";
import { getMe, logoutUser, userLogIn, userSignup } from "../controller/user-controller.js";


router.post('/compile',CodeCompile);
router.post('/signup',userSignup);
router.post('/login',userLogIn);

router.get('/logout',logoutUser);
router.get('/api/auth/me',getMe);

export default router;