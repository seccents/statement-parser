"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdfcCsvStatementParser = void 0;
const parse_1 = require("@fast-csv/parse");
const fs_1 = require("fs");
const path_1 = require("path");
const BankTransaction_1 = require("../models/BankTransaction");
class HdfcCsvStatementParser {
    static parseHDFCAccountStatement() {
        return new Promise((resolve) => {
            const transactions = [];
            const csvContent = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, '../../../assets', 'banking/hdfc-lakshya.txt'))
                .toString()
                .split('\n'); // read file and convert to array by line break
            if (csvContent[0].trim() == '') {
                csvContent.shift(); // remove the the first element from array
            }
            (0, fs_1.writeFileSync)((0, path_1.resolve)(__dirname, '../../../assets', 'banking/hdfc-lakshya.csv'), csvContent.join('\n')); // convert array back to string
            (0, fs_1.createReadStream)((0, path_1.resolve)(__dirname, '../../../assets', 'banking/hdfc-lakshya.csv'))
                .pipe((0, parse_1.parse)({ trim: true, headers: true, discardUnmappedColumns: true }))
                .on('error', (error) => {
                console.error(error);
            })
                .on('data', (row) => {
                transactions.push(new BankTransaction_1.BankTransaction(row));
            })
                .on('end', (rowCount) => {
                console.log(`Parsed ${rowCount} rows`);
                resolve(transactions);
            });
        });
    }
}
exports.HdfcCsvStatementParser = HdfcCsvStatementParser;
//# sourceMappingURL=HdfcCsvStatementParser.js.map