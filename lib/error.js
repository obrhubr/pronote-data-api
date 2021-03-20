const pronote = require('../pronote-api-custom');

module.exports = {
    dataMissing: function (req, res) {
        res.status(401).json({ error: 'Specify url, username and password of your account!' });
        return;
    },
    wrongCredentials: function (req, res, err) {
        console.log(err)
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            res.status(501).json({ error: 'Wrong Credentials' });
        } else {
            res.status(501).json({ error: err });
        };
    }
};