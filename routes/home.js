var connection = require('./dbConfig');
var express = require('express');
var homeRouter = express.Router();

homeRouter.get('/', function (req, res) {
    if(req.session.username) {
        res.render('home');
    } else {
        res.redirect('/');
    }
});

module.exports = homeRouter;