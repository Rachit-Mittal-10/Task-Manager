import User from "../models/User.js";
import { generateToken } from "#utils/utils.js";

const login = async (req, res) => {
    const user = new User();
    const { username, email, password } = req.body;
    // if password and any of email or username not provided then return the 400 error
    if (!password || (!username && !email)) {
        res.status(400).json({ message: "All Parameters not provided." });
    }
    try {
        let passwordStatus = false;
        if (username) {
            passwordStatus = await user.verifyUserByUsername(
                username,
                password,
            );
        } else if (email) {
            passwordStatus = await user.verifyUserByEmail(email, password);
        }

        if (!passwordStatus) {
            return res.status(401).json({ message: "Login Failed" });
        }

        const token = generateToken(user.user);
        res.status(200).json({
            message: "Login Successful",
            token: token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
        return res
            .status(400)
            .json({ message: "All parameters not provided." });
    }
    try {
        await User.create(username, email, password);
        return res.status(200).json({ message: "User Added" });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "User already exists!" });
        } else {
            return res
                .status(500)
                .json({ message: "Unable to add the credentials" });
        }
    }
};

export { login, register };
