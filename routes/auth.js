const express = require("express");
var authRouter = express.Router();
var connection = require('./dbConfig');

authRouter.post('/', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if(username && password){
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (err, result) {
            console.log(result);
            if(err) throw err;
            if(result.length > 0) {
                req.session.loggedIn = true;
                req.session.username = result[0].username;
                res.redirect('/home');
            } else {
                res.send("Incorrect username or password");
            }
            res.end();
        });
    } else {
        res.send("Please enter a username or password");
        res.end();
    }
});

module.exports = authRouter;