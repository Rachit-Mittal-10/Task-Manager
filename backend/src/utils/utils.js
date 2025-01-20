import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { promisify } from "util";

const env = dotenv.config({
    path: "./.env",
});

const jwtVerify = promisify(jwt.verify);

const hashPassword = async (password, salt = 10) => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.log(`Error while hashing the password: ${err}`);
    }
};

const verifyPassword = async (inputPassword, storedHashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(
            inputPassword,
            storedHashedPassword,
        );
        return isMatch;
    } catch (err) {
        console.log(`Error while verifying the password: ${err}`);
        // throw err;
    }
};

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const options = {
        expiresIn: "1h",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
    return token;
};

const findRatio = (data, total) => {
    for (let obj of data) {
        obj.ratio = Math.round((obj.COUNT * 10000) / total) / 100;
    }
    return data;
};

const { customSort } = (() => {
    const statusOrder = {
        planned: 0,
        pending: 1,
        finished: 2,
    };

    const priorityOrder = {
        not_set: 0,
        low: 1,
        medium: 2,
        high: 3,
    };

    const customSort = (a, b) => {
        const status = statusOrder[a.status] - statusOrder[b.status];
        const priority = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (status !== 0) {
            return status;
        }
        return priority;
    };
    return { customSort };
})();

const stripTimeFromDate = (datetime) => {
    if (!datetime) {
        return datetime;
    }
    const date = datetime.toISOString().split("T")[0];
    return date;
};

export {
    hashPassword,
    verifyPassword,
    generateToken,
    jwtVerify,
    findRatio,
    customSort,
    stripTimeFromDate,
};
