const checkTokenExpiry = (payload) => {
    try {
        const exp = payload.exp;
        const iat = payload.iat;
        const currentTime = Math.floor(Date.now() / 1000);
        //* would return true in case token is expired otherwise false
        return exp < currentTime;
    } catch {
        //* would return true in case of any error forcing to user to relogin
        return true;
    }
};

const consoleFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
        console.log(`${key} : ${value}`);
    }
};

const checkArrayEmpty = (arr) => {
    return arr.length === 0;
};

export { checkTokenExpiry, consoleFormData, checkArrayEmpty };
