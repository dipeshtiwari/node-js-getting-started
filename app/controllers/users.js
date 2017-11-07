var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Users = require('../models/users');


exports.getUsers = function(req, res) {
    Users.find({}, function(err, users) {
        if (err)
            return next(err);
        res.status(200).json(users);
    });
}

//user login
exports.login = function(req, res, next) {
    Users.findOne({ 'email': req.body.email }, 'password', function(err, user) {
        console.log(user);
        const payload = {
            user: user._id
        };

        var token = jwt.sign(payload, 'hello-computer', {
            expiresIn: 60 * 60 * 24
        });

        if (!user) {
            return res.status(500).json({
                message: 'User not found with this email id.'
            });
        }

        if (err) {
            res.status(500).json({
                message: 'Error in logging.'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, doesMatch) {
                if (doesMatch) {
                    res.status(200).json({
                        message: 'You are logged in successfully.',
                        token: token
                    });
                } else {
                    res.status(500).json({
                        message: 'Error in logging. Username and password does not matched'
                    });
                }
            });
        }
    });
}

//user register
exports.register = function(req, res, next) {
    var register = new Users(req.body);

    if (isEmailExists(req.body.email)) {
        return res.status(500).json({
            message: 'User already exist with this email id.'
        });
    }

    //bcrypt for password hashing
    bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
        console.log(bcryptedPassword);
        register.password = bcryptedPassword;
        register.save(function(err) {
            if (!err) {
                res.status(200).json({
                    message: 'You are registered successfully.'
                });
            } else {
                res.status(401).json({
                    message: 'Error in registering user.'
                });
            }
        });
    });
}


exports.logout = function(req, res, next) {

}

function isEmailExists(email) {
    console.log(email);
    Users.findOne({ 'email': email }, 'email', function(err, user) {
        console.log(user);
        if (user) {
            return true;
        } else {
            return false;
        }
    });
}