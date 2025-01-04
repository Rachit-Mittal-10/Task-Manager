const classifyInput = (input) => {
    //* This function classifies the input as email or username
    //* If true, then email otherwise username
    const trimmedInput = input.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(trimmedInput)) {
        return true;
    }
    return false;
};

//* This function checks whether password is valid or not
const checkPasswordValidity = (password) => {
    //* Check if password provided or not
    if (!password) {
        return false;
    }
    //* Check if password is between 4 and 20
    if (password.length < 4 && password.length > 20) {
        return false;
    }
    return true;
};

const checkEmailValidity = (email) => {
    //* This function checks whether email is valid or not
};

const checkUsernameValidity = (username) => {
    //* This function checks whether username is valid or not
};

export {
    classifyInput,
    checkUsernameValidity,
    checkEmailValidity,
    checkPasswordValidity,
};
