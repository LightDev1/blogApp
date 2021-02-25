const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Токен не передан' })
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Нет авторизации' });
        }

        const decoded = jwt.verify(token, config.get('jwt').secret);

        if (decoded.type !== 'access') {
            return res.status(401).json({ message: 'Невалидный токен' });
        }

        req.user = decoded;
        next();

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Срок действия токена истек' });
        }
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Невалидный токен 2' });
        }
    }
};