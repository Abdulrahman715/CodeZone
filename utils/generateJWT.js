require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (payload) => {
    const token = await jwt.sign(payload, process.env.SECRIT_KEY, {
      expiresIn: "10m",
    });

    return token;
}