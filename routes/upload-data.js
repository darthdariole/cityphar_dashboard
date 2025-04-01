var express = require('express');
var uploadRouter = express.Router();
var connection = require('./dbConfig');
const fs = require('fs');
const _ = require('lodash');
const { readTransFile } = require('../utils-module/lib/readFiles');

uploadRouter.get('/', function (req, res) {
    if (req.session.username) {
        res.render('upload')
    } else {
        res.redirect('/');
    }

});
uploadRouter.post('/', function async (req, res) {
    if (req.session.username) {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No files were uploaded'
                });
            } else {
                let data = [];
                let status = false;
                let message = "";
                let readStatus = [];
                // Loop through all the files
                if (req.files.inHouseDataFiles.length === 4) {
                    _.forEach(_.keysIn(req.files.inHouseDataFiles), (key) => {
                        let file = req.files.inHouseDataFiles[key];

                        if (file.name === 'Customer.txt' || file.name === 'Product.txt' || file.name === 'Transaction.txt' || file.name === 'StockInHand.txt') {
                            // Move file to upload directory
                            file.mv('./uploads/' + file.name);
                            // Push file details into array
                            data.push({
                                name: file.name,
                                mimeType: file.mimeType,
                                size: file.size
                            });
                            readTransFile(file.name);
                            
                            message = "Files uploaded successfully...";
                            status = true;
                        } else {
                            message = "Please select files with correct names...";
                        }
                    });
                } else {
                    message = "Number of files should be 4...";
                }
                res.send({
                    status: status,
                    message: message,
                    data: data
                });
            }

        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    } else {
        res.redirect('/');
    }
});

module.exports = uploadRouter;