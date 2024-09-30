const verifyUsername = (username) => {
    if(username.contains('@') || username.contains('.')){
        return false;
    }
    return true;
};

export { verifyUsername };