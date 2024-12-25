const classifyInput = (input) => {
    //* This function classifies the input as email or username
    //* If true, then email otherwise username
    const trimmedInput = input.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(trimmedInput)){
        return true;
    }
    return false;
};

export {
    classifyInput,
}