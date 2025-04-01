exports.readTransFile = async (filename) => {

    var connection = require("../../routes/dbConfig");

    var fs = require('node:fs');
    var lineReader = require('readline');
    const fileStream = fs.createReadStream('./uploads/Transaction.txt');

    const rl = lineReader.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    var fileData = [];

    for await (const line of rl) {
        const splitline = line.split(" ");
        const cleanedLine = splitline.filter((point) => point.trim() != '');
        const moment = require('moment');
        var momentDate = moment(cleanedLine[1], 'DD/MM/YYYY', true).format('yyyy-MM-DD hh:mm:ss');
        if (cleanedLine.length == 12) {
            fileData.push({
                transactionId: cleanedLine[0],
                date: momentDate,
                productId: cleanedLine[2],
                alternateId: cleanedLine[3],
                quantity: cleanedLine[4],
                tp: cleanedLine[5],
                bonus: cleanedLine[6],
                discount: cleanedLine[7],
                batchNo: cleanedLine[8],
                expiry: cleanedLine[9],
                customerId: cleanedLine[10],
                transactionType: cleanedLine[11],
            });
        } else {
            fileData.push({
                transactionId: cleanedLine[0],
                date: momentDate,
                productId: cleanedLine[2],
                alternateId: '',
                quantity: cleanedLine[3],
                tp: cleanedLine[4],
                bonus: cleanedLine[5],
                discount: cleanedLine[6],
                batchNo: cleanedLine[7],
                expiry: cleanedLine[8],
                customerId: cleanedLine[9],
                transactionType: cleanedLine[10],
            });
        }
    }
    if (fileData.length > 0) {
        for (const object of fileData) {
            var query = connection.query("INSERT INTO transaction SET ?", object, (error, results, fields) => {
                if (error) console.error(error.sqlMessage);
            });
        }
    }
    
    return fileData;
}

// TODO: Implement this function for remaining files