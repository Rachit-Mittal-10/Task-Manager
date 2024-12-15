import { jwtVerify } from "../utils/utils";
import dotenv from "dotenv";

const env = dotenv.config({
    path: "./.env"
});

const authenticateToken = async (req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").split(' ')[1];
    if(!token){
        res.status(401).json({message: "Access Denied. No Token Provided"});
        return;
    }
    try{
        const decoded = jwtVerify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(403).json({message: "Expired or Invalid Token"});
        return;
    }
};

export {
    authenticateToken
};