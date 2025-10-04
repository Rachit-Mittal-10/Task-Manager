import User from "../models/User.js";

const getUserDetails = async (req, res) => {
    const userId = req.user.id;
    if(!userId){
        res.status(401).json({
            message: "No User ID in the request body"
        });
    }
    try {
        const result = await User.getUserDetails(userId);
        res.status(200).json({
            message: "Data fetched successfully",
            data: result,
        });
    } catch(err){
        res.status(400).json({message: "Unable to fetch data"});
    }
}

export {
    getUserDetails
};