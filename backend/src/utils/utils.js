import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config({
    path: "./.env"
});


const hashPassword = async (password, salt=10) => {
    try{
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err){
        console.log(`Error while hashing the password: ${err}`);
    }
};

const verifyPassword = async (inputPassword, storedHashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
        return isMatch;
    }
    catch(err){
        console.log(`Error while verifying the password: ${err}`);
        // throw err;
    }
};

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn:"1h"
    }
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        options
    );
    return token;
};

export {
    hashPassword,
    verifyPassword,
    generateToken
};