var express = require('express');
var companiesRouter = express.Router();
var connection = require('./dbConfig');

companiesRouter.get('/', function(req, res) {
    if (req.session.username) {
        connection.query('SELECT * FROM company', (error, results, fields) => {
            if(error) throw error;
            if(results.length > 0) {
                res.render('company', {companies: results});
            }
        });
        //res.render('company');
    } else {
        res.redirect('/');
    }

});
companiesRouter.get('/new', function(req, res) {
    if(req.session.username) {
        res.render('addCompany');
    } else {
        res.redirect('/');
    }
});
companiesRouter.post('/new', function(req, res) {
    if(req.session.username) {
        var { companyId, companyDesc, inActive } = req.body;
        if(companyId && companyDesc) {
            connection.query('INSERT INTO company SET ?', {
                companyId: companyId,
                companyDesc: companyDesc.toUpperCase(),
                inActive: inActive ? true : false,
            }, (error, results, fields) => {
                if (error) throw error;
                console.log(results);
                if(results.affectedRows > 0) {
                    res.redirect('/company/');
                }
            });
        }
    } else {
        res.redirect('/');
    }
});
companiesRouter.get('/edit/:id', function(req, res) {
    if(req.session.username) {
        var id = req.params.id;
        connection.query('SELECT * FROM company WHERE companyId = ?', [id], (error, results, fields) => {
            if(error) throw error;
            if(results.length > 0) {
                console.dir(results);
                res.render('editCompany', {companies: results[0]});
            }
        });
    } else {
        res.redirect('/company/');
    }
});
companiesRouter.post('/edit/:id', function(req, res) {
    if(req.session.username) {
        var id = req.params.id;
        connection.query('UPDATE company SET ? WHERE companyId = ' + id, {companyDesc: req.body.companyDesc, inActive: req.body.inActive ? true : false}, (error, results, fields) => {
            if(error) throw error;
            if(results.affectedRows > 0) {
                res.redirect('/company/');
            }
        });
    } else {
        res.redirect('/company/');
    }
});
companiesRouter.get('/:id', function(req, res) {});
companiesRouter.get('/upload', function(req, res) {});
companiesRouter.post('/upload', function(req, res) {});

module.exports = companiesRouter;