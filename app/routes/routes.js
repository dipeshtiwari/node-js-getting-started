//initialize
var ex = require('express');
var jwt = require('jsonwebtoken');

var router = ex.Router();

router.use(function(req, res, next) {
    console.log('path', req.originalUrl)
    var token = req.body.access_token || req.query.access_token || req.headers['access_token'];

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'hello-computer', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {

        if (req.originalUrl == '/api/user/login' || req.originalUrl == '/api/user/register') {
            next();
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
})

//App Routes
require('./blog')(router);
require('./users')(router);

//expot the module
module.exports = router;