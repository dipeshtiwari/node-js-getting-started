var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
    // load the todo model
var Users = require('../controllers/users');
// expose the routes to our app with module.exports
module.exports = function(app) {
    // api ---------------------------------------------------------------------
    // get all users
    app.get('/getUsers', Users.getUsers);

    //
    app.post('/user/image', upload.single('avatar'), function(req, res) {
        console.log('req', req.file);
        res.json({
            message: "file uploaded"
        });
    });

    // create todo and send back all todos after creation
    app.post('/user/register', Users.register);

    //user login
    app.post('/user/login', Users.login);

    // delete a todo
    app.delete('/todos/:todo_id', function(req, res) {

    });
};