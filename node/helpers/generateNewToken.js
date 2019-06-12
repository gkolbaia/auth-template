const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let auth = req.headers.authorization;
    if (!auth) {
       return next();
    };
    let token = auth.split(' ')[1];
    if (!token || token === 'null') {
        return next();
    };
    jwt.verify(token, 'SecretKey', (err, success) => {
        if (err) {
           return next();
        } else if (success) {
            let newToken = jwt.sign({ userId: success.userId }, 'SecretKey', { expiresIn: '1h' });
            res.setHeader('token', newToken);
            next();
        }
    });
};