const jsonwebtoken = require('jsonwebtoken');

function createJWT(payload) {
    const accessToken = create(payload, {subject: "access token", expiresIn: "5s"});
    const refreshToken = create(payload, {subject: "access token", expiresIn: "10s"});

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

function create(payload, options) {
    return jsonwebtoken.sign(payload, process.env.API_KEY, options);
}

async function verify(token) {
    let verifiedToken = {};
    
    await jsonwebtoken.verify(token, process.env.API_KEY, (err, res) => {
        verifiedToken = res;
    });

    return verifiedToken;
}

module.exports = { create, verify }
