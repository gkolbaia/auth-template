const jwt = require('jsonwebtoken');
const localStorage = require('localStorage')
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
            // console.log('frnt', token, req.originalUrl);
            // console.log('lcls', localStorage.getItem('token'), req.originalUrl);
            // console.log('-------------------------------------------------------------------------------------');
            //ეს სულელურად მაქ შეიძლება ჩეიჯვას
            if (token !== localStorage.getItem('token')) {
                return res.status(401).send('Unautorized request');
            }
            localStorage.setItem('token', newToken);
            next();
        }
    });
};