import User from '../models/user-schema.js';
import bcrypt from 'bcrypt';
import { checkAuth, cookieSetter, generateToken } from '../utils/features.js';

export const userSignup= async (req,res)=>{
    // console.log("usersignup running!");
    if(req.method!=="POST"){ return res.status(400).json({
        success : false,
        msg :"Invalid method"
    })
    }
    const {name,email,password,cpassword}=req.body;

    if(!name || !email || !password || !cpassword)
    {
        return res.status(400).json({
            message :"Please enter all fields",
            success:false
        })
    }
    const user = await User.findOne({email:email});
    if(user){
        return res.status(409).json({message:"Email already exists",success:false});
    }else{
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log('hashed password',hashedPassword);
        const userD = {
            name : name,
            email : email,
            password: hashedPassword,
            cpassword:hashedPassword,
        }
        const newUser =new User(userD);
        await newUser.save();


        const token = generateToken(newUser._id);

        cookieSetter(res, token, true);

        return res.status(200).json({
            success:true,
            message:"Signup successful",
            user:newUser,
        })
    }catch(error)
    {
        res.status(500).json({message : error.message,success:false});
    }
}
}

export const userLogIn = async (req, res) => {
    if(req.method!=="POST"){ return res.status(400).json({
        success : false,
        message :"Invalid method"
    })
    }
    const {email,password}=req?.body;

    if(email==='' || password==='')
    {
        return res.status(505).json({
            message :"Please enter all fields",
            success:false
        })
    }
    try {
        let user = await User.findOne({ email: email});
        if(!user){
            return res.status(503).json({success:false,message:'Invalid Email or Password'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch)
        {
            return res.status(503).json({success:false,message:'Invalid Email or Password'});
        }else{
            const token = generateToken(user._id);
            // console.log("toeken",token);
            cookieSetter(res, token, true);

            res.status(200).json({
                success:true,
                message:`Welcome back ${user.name}`,
                user:user,
            })
        }
    } catch (error) {
        return res.status(500).json({success:false,message:'Unable to Login'});     
    }
}

export const logoutUser = (req,res)=>{
    if(req.method !== "GET") return res.status(400).json({message:"Only Get MEthod is allowed",success:false});
    try{
        cookieSetter(res, null, false);

        return res.status(200).json({
            success: true,
            message: `Logged Out Successfully`,
        });
    }catch(error){
        return res.status(400).json({message:"Unable to logout",success:false});
    }
}

export const getMe= async(req,res)=>{
    if (req.method !== "GET")
     return res.status(400).json({message:"Only GET Method is allowed",success:false});
    try{
        const user = await checkAuth(req);
        if(!user)
        return res.status(400).json({message:"Login or register first",success:false});
        return res.status(200).json({
            success: true,
            user,
          });
    }catch(error){
        console.log("Error in getting me", error);
        return res.status(400).json({message:"Error",success:false});
    }
}