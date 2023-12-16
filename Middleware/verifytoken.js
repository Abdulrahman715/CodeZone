
const jwt = require('jsonwebtoken');

const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
    const authHeader =
        req.headers["Authorization"] || req.headers["authorization"];
    
    if (!authHeader) {
        return {
            status: httpStatusText.FAIL,
            data: null,
            message:"token is required"
        };
    }

    const token = authHeader.split(' ')[1];

    try {
        const currentUser = jwt.verify(token, process.env.SECRIT_KEY);

        console.log("currentUser", currentUser);
        req.currentUser = currentUser;
        next();
    } catch {
        res.status(401).json({
            status: httpStatusText.ERROR,
            data: null,
            message: "invalid token"
        });
    }
}

module.exports = verifyToken ;