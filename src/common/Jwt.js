const jsonwebtoken = require('jsonwebtoken');

function createJWT(payload) {
    const accessToken = create(payload, {subject: "access token", expiresIn: "5s"});
    const refreshToken = create(payload, {subject: "access token", expiresIn: "30s"});

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

function getJWT(token) {
    return verify(token);
}

function create(payload, options) {
    return jsonwebtoken.sign(payload, process.env.API_KEY, options);
}

function verify(token) {
    let verifiedToken = {};

    jsonwebtoken.verify(token, process.env.API_KEY, (err, res) => {
        verifiedToken = res;
    });

    return verifiedToken;
}

module.exports = { createJWT, getJWT }
