import { Router } from "express";
import User from "../models/User.js";


const router = Router();
const user = new User();

router.post("/login",(req, res)=>{
    const { username, password } = req.body;
    if( username === "test" && password === "test"){
        console.log("Login Successful");
        res.status(200).json({message: "Login Successful"});
    }
    else{
        console.log("Login Failed");
        res.status(401).json({message: "Login Failed"});
    }
});

router.post("/register",async (req,res) => {
    const {username, email, password} = req.body;
    if(!(username && email && password)){
        res.status(401).json({message: "All parameters not provided."});
        return;
    }
    try{
        await user.create(username, email,password);
        res.status(200).json({message: "User Added"});
    }
    catch(err){
        res.status(401).json({message: "Unable to add the credentials"})
    }
});

router.post("/test",async (req, res) => {
    const {username} = req.body;
    try{
        await user.checkUsername(username);
        res.status(200).json({message: "User exists"});
    }
    catch(err){
        res.status(404);
    }
});

export {
    router
};