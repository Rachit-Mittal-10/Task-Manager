const checkTokenExpiry = (payload) => {
    try {
        const exp = payload.exp;
        const iat = payload.iat;
        const currentTime = Math.floor(Date.now() / 1000);
        //* would return false in case token is expired otherwise false
        return exp < currentTime;
    } catch {
        //* would return true in case of any error forcing to user to relogin
        return true;
    }
};

export { checkTokenExpiry };
