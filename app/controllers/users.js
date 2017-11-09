var bcrypt = require('bcrypt');
var HttpStatus = require('http-status');
var jwt = require('jsonwebtoken');
var Users = require('../models/users');
var emailHelper = require('../helper/email.helper');
//get users
exports.getUsers = function(req, res) {
    Users.find({}, function(err, users) {
        if (err)
            return next(err);
        res.status(HttpStatus.OK).json(users);
    });
}

//user login
exports.login = function(req, res, next) {
    Users.findOne({ 'email': req.body.email }, 'password', function(err, user) {
        const payload = {
            user: user._id
        };

        var token = jwt.sign(payload, 'hello-computer', {
            expiresIn: 60 * 60 * 24
        });

        if (!user) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'User not found with this email id.'
            });
        }

        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: 'Error in logging.'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, doesMatch) {
                if (doesMatch) {
                    res.status(HttpStatus.OK).json({
                        message: 'You are logged in successfully.',
                        token: token
                    });
                } else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
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
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'User already exist with this email id.'
        });
    }

    //bcrypt for password hashing
    bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {

        register.password = bcryptedPassword;
        register.save(function(err) {
            if (!err) {
                res.status(HttpStatus.OK).json({
                    status: false,
                    message: 'You are registered successfully.'
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: false,
                    message: 'Error in registering user.'
                });
            }
        });
    });
}

exports.logout = function(req, res, next) {

}

exports.forgotPassword = function(req, res, next) {
    emailHelper.sendMail().then(resolve => {
        res.status(HttpStatus.OK).send({ 'status': true, 'message': 'Email sent successfully.' });
    }).catch(err => {
        res.status(HttpStatus.BAD_REQUEST).send({ 'status': false, 'message': 'Error in sending email.' });
    });
}

function isEmailExists(email) {
    console.log(email);
    Users.findOne({ 'email': email }, 'email', function(err, user) {
        if (user) {
            return true;
        } else {
            return false;
        }
    });
}