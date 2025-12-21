import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const jwtVerify = promisify(jwt.verify);

const hashPassword = async (password: string, salt = 10) : Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.log(`Error while hashing the password: ${err}`);
    }
};

const verifyPassword = async (inputPassword: string, storedHashedPassword: string): Promise<Boolean> => {
    try {
        const isMatch = await bcrypt.compare(
            inputPassword,
            storedHashedPassword,
        );
        return isMatch;
    } catch (err) {
        console.log(`Error while verifying the password: ${err}`);
        throw err;
    }
};

const generateToken = (user, jwtSecretKey = process.env.JWT_SECRET_KEY) => {
    const payload = {
        auth_id: user.id,
        user_id: user.user_id,
    };
    const options = {
        expiresIn: "1h",
    };
    const token = jwt.sign(payload, jwtSecretKey, options);
    return token;
};

export {
    jwtVerify,
    hashPassword,
    generateToken,
    verifyPassword
};
