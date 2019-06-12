const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://192.168.4.169/gio-test-4-auth', { useNewUrlParser: true })


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
const generateNewToken = require('./helpers/generateNewToken');
app.use('/', generateNewToken)
const verify = require('./helpers/verify')
const auth = require('./routes/auth');
const getUserId = require('./helpers/getUserId');
require('./models/user');
const UserModel = mongoose.model('user');

app.get('/getuser', verify, (req, res) => {
    const id = getUserId(req, res);
    UserModel.findById(id, (err, user) => {
        if (err) {
            res.status(500).send('Something Went Wrong')
        } else if (!user) {
            res.status(404).send('Cant Find That User');
        } else if (user) {
            res.status(200).send(user)
        }
    })
});






app.use('/auth', auth)
const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});