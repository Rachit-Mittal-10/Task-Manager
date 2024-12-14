import { Router} from "express";
import conn from "../config/mysql.js";
import { hashPassword } from "../utils/utils.js";
import { addUserData } from "../utils/dbUtils.js";


const router = Router();

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
    const password_hash = await hashPassword(password);
    if(!password_hash){
        res.status(500).json({message: "Server Error. Password Hashing failing."});
    }
    try{
        addUserData(username,email,password_hash);
        res.status(200).json({message: "User Added"});
    }
    catch(err){
        console.log(`Error while adding the data: ${err}`);
        res.status(401).json({message: "Unable to add the credentials"})
    }
});

export {
    router
};