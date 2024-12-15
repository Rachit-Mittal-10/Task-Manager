import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res)=>{
    const { username,email, password } = req.body;
    if(!password || (!username && !email)){
        res.status(400).json({message: "All Parameters not provided."});
    }
    try{
        let passwordStatus = false;
        if(username){
            passwordStatus = await User.verifyUserByUsername(username, password);
        }
        else if(email){
            passwordStatus = await User.verifyUserByEmail(email, password);
        }
    
        if(!passwordStatus){
            return res.status(401).json({message: "Login Failed"});
        }

        res.status(200).json({
            message: "Login Successful"
        });
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.post("/register",async (req,res) => {
    const {username, email, password} = req.body;
    if(!(username && email && password)){
        res.status(400).json({message: "All parameters not provided."});
        return;
    }
    try{
        await user.create(username, email,password);
        res.status(200).json({message: "User Added"});
    }
    catch(err){
        if(err.code === "ER_DUP_ENTRY"){
            res.status(409).json({message: "User already exists!"});
        }
        else{
            res.status(500).json({message: "Unable to add the credentials"})
        }
    }
});

export {
    router
};