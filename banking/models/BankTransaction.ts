import moment = require('moment');

export class BankTransaction {
	referenceNo: string;
	transactionDate: Date;
	actionTitle: string;
	transactionType: TransactionType;
	transactionAmount: number;
	balanceAmount: number;

	constructor(exchangeRowJson) {
		this.referenceNo = exchangeRowJson['Chq/Ref Number'];
		this.transactionDate = this.getParsedDate(exchangeRowJson['Date']);
		this.actionTitle = exchangeRowJson['Narration'];
		this.balanceAmount = +exchangeRowJson['Closing Balance'];
		this.setTranscationTypeAndAmount(+exchangeRowJson['Debit Amount'], +exchangeRowJson['Credit Amount']);
	}

	setTranscationTypeAndAmount(debitAmount: number, creditAmount: number): void {
		if (debitAmount > 0) {
			this.transactionType = TransactionType.DEBIT;
			this.transactionAmount = +debitAmount;
		} else if (creditAmount > 0) {
			this.transactionType = TransactionType.CREDIT;
			this.transactionAmount = +creditAmount;
		}
	}

	/**
	 * Convert a "dd/MM/yyyy" string into a Date object
	 */
	getParsedDate(dateString: string): Date {
		return moment(dateString, 'dd/MM/YY').toDate();
	}
}

export enum TransactionType {
	CREDIT = 'credit',
	DEBIT = 'debit'
}
