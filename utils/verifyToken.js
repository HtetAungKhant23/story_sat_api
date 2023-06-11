const jwt = require('jsonwebtoken');
const getTokenFromHeader = require("./getToken");

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if(err){
            return false;
        }
        return decode;
    });
}

module.exports = verifyToken;