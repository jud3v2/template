const JWT = require('jsonwebtoken');
const config = require('../../config');

const encode = payload => {
        return JWT.sign(payload, config.jwtSecret, { expiresIn: '2h' });
}

const decode = token => {
        return JWT.verify(token, config.jwtSecret);
}

const verify = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
                return res.status(401).json({ message: "No token provided" });
        }

        try {
                // decoded token used in app.use(verify
                req.user = JWT.verify(token, config.jwtSecret);
                next();
        } catch (error) {
                return res.status(401).json({ message: "Unauthorized" });
        }
}

module.exports.verify = verify;
module.exports.encode = encode;
module.exports.decode = decode;

module.exports = {
        encode,
        decode,
        verify
}