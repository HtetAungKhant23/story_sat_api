const getTokenFromHeader = require("../utils/getToken");
const verifyToken = require("../utils/verifyToken");

const isAuth = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decoded = verifyToken(token);
    if(!decoded){
        const err = new Error('Invalid/expired token! Please Login agian!');
        next(err);
    }
    req.userAuth = decoded.id;
    next();    
}

module.exports = isAuth;
