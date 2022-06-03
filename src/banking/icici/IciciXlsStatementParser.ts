import { readFile, utils } from 'xlsx';
import { createReadStream, readFileSync, writeFileSync } from 'fs';
import { parse } from '@fast-csv/parse';
import { BankTransaction } from '../models/BankTransaction';

const workbook = readFile('./assets/banking/icici/icici_kanna.xls', { sheets: 0 });
const sheetNames = workbook.SheetNames;
const sheet = workbook.Sheets[sheetNames[0]];
// const iciciStatement = utils.sheet_to_json(sheet, { range: 13, header: 1 });
// writeFileSync('./assets/banking/icici/icici_kanna.txt', iciciStatement.toString());
const csvStmt = utils.sheet_to_csv(sheet);
writeFileSync('./assets/banking/icici/icici_kanna.csv', csvStmt.toString());
const csvContent = readFileSync('./assets/banking/icici/icici_kanna.csv').toString().split('\n'); // read file and convert to array by line break
csvContent.splice(0, 12);
writeFileSync('./assets/banking/icici/icici_kanna.csv', csvContent.join('\n')); // convert array back to string

const transactions: BankTransaction[] = [];
createReadStream('./assets/banking/icici/icici_kanna.csv')
	.pipe(parse({ trim: true, headers: true, discardUnmappedColumns: true }))
	.on('error', (error) => {
		console.error(error);
	})
	.on('data', (row) => {
		writeFileSync('./assets/banking/icici/icici_kanna.txt', JSON.stringify(row, null, 2), 'utf-8');
		// transactions.push(new BankTransaction(row));
	})
	.on('end', (rowCount: number) => {
		console.log(`Parsed ${rowCount} rows`);
		// writeFileSync('./assets/banking/icici/icici_kanna.txt', JSON.stringify(transactions, null, 2), 'utf-8');
	});
