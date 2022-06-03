import { parse } from '@fast-csv/parse';

import { createReadStream, readFileSync, writeFileSync } from 'fs';
import { resolve as pathResolve } from 'path';
import { BankTransaction } from '../../models/BankTransaction';

export class HdfcCsvStatementParser {
	public static parseHDFCAccountStatement(): Promise<BankTransaction[]> {
		return new Promise<BankTransaction[]>((resolve): void => {
			const transactions: BankTransaction[] = [];

			const csvContent = readFileSync(pathResolve(__dirname, '../../../../assets', 'banking/HDFC_Meyyappan.txt'))
				.toString()
				.split('\n'); // read file and convert to array by line break
			if (csvContent[0].trim() == '') {
				csvContent.shift(); // remove the the first element from array
			}
			writeFileSync(
				pathResolve(__dirname, '../../../../assets', 'banking/HDFC_Meyyappan.csv'),
				csvContent.join('\n')
			); // convert array back to string

			createReadStream(pathResolve(__dirname, '../../../../assets', 'banking/HDFC_Meyyappan.csv'))
				.pipe(parse({ trim: true, headers: true, discardUnmappedColumns: true }))
				.on('error', (error) => {
					console.error(error);
				})
				.on('data', (row) => {
					transactions.push(new BankTransaction(row));
				})
				.on('end', (rowCount: number) => {
					console.log(`Parsed ${rowCount} rows`);
					resolve(transactions);
				});
		});
	}
}
