export declare class BankTransaction {
    referenceNo: string;
    transactionDate: Date;
    actionTitle: string;
    transactionType: TransactionType;
    transactionAmount: number;
    balanceAmount: number;
    constructor(exchangeRowJson: any);
    setTranscationTypeAndAmount(debitAmount: number, creditAmount: number): void;
    /**
     * Convert a "dd/MM/yyyy" string into a Date object
     */
    getParsedDate(dateString: string): Date;
}
export declare enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}
