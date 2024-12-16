import { jwtVerify } from "../utils/utils.js";
import { config } from "dotenv";

const env = config({
    path: "./.env"
});

const authenticateToken = async (req, res, next) => {
    
    //* Extract the token from HTTP request incoming
    const token = req.header("Authorization") && req.header("Authorization").split(' ')[1];
    
    //* if token not present return the error.
    if(!token){
        return res.status(401).json({message: "Access Denied. No Token Provided"});
    }

    //* Verify the Token
    try{
        const decoded = await jwtVerify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(403).json({message: "Expired or Invalid Token"});
    }
};

export {
    authenticateToken
};