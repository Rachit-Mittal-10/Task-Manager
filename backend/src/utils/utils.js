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

export {
    hashPassword
};