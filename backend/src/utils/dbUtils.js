import conn from "../config/mysql.js";

const addUserData = async (username, email, password) => {
    const query = "INSERT INTO users(username, email, password_hashed) VALUES(?,?,?)";

    try{
        const [results] = await conn.execute(query,[username, email, password]);
        console.log(`Inserted the data.`);
    }
    catch(err){
        throw err;
    }
};



export {
    addUserData,
    // getUserData,
};