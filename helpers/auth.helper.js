const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuid } = require('uuid');
const Token = require('../modeles/Token');

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: config.get('jwt').tokens.access.type,
    };

    const options = { expiresIn: config.get('jwt').tokens.access.expiresIn };

    return jwt.sign(payload, config.get('jwt').secret, options);
};

const generateRefreshToken = () => {
    const payload = {
        id: uuid(),
        type: config.get('jwt').tokens.refresh.type,
    };

    const options = { expiresIn: config.get('jwt').tokens.refresh.expiresIn };

    return {
        id: payload.id,
        token: jwt.sign(payload, config.get('jwt').secret, options),
    };
};

const replaceDBTokens = async ({ accessTokenId, refreshTokenId, userId }) => {
    await Token.findOneAndDelete({ userId });

    const token = new Token({
        accessTokenId,
        refreshTokenId,
        userId,
    });

    token.save();
};

const updateTokens = async (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();

    const tokens = {
        accessToken,
        refreshToken: refreshToken.token,
        userId,
    };

    await replaceDBTokens({
        accessTokenId: uuid(),
        refreshTokenId: refreshToken.id,
        userId,
    });

    return tokens;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDBTokens,
    updateTokens,
};