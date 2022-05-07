import { BankTransaction } from '../models/BankTransaction';
export declare class HdfcCsvStatementParser {
    static parseHDFCAccountStatement(): Promise<BankTransaction[]>;
}
