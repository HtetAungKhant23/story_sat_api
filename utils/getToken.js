const getTokenFromHeader = (req) => {
    const headerObj = req.headers;
    const token = headerObj['authorization'].split(" ")[1];
    return token;
}

module.exports = getTokenFromHeader;