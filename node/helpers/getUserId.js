const jwt = require('jsonwebtoken');
module.exports = function (req, res) {
    let token = req.headers.authorization.split(' ')[1];
    let payload = jwt.verify(token, 'SecretKey');
    return payload.userId;
}