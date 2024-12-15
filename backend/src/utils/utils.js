import bcrypt from "bcryptjs";

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

export {
    hashPassword,
    verifyPassword
};