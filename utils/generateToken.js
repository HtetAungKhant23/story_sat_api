const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '1h'});
    return token;
}

module.exports = generateToken;