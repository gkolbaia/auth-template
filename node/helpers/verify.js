const jwt = require('jsonwebtoken');
const localStorage = require('localStorage')

module.exports = function (req, res, next) {
    var auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).send('Unauthorized Request')
    };
    let token = auth.split(' ')[1];
    if (!token || token == 'null') {
        return res.status(401).send('Unauthorized Request');
    };
    jwt.verify(token, 'SecretKey', (err, verified) => {
        if (err) {
            return res.status(401).send('Unauthorized Request')
        };
        next()
    });
};