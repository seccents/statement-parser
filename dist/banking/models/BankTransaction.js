"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.BankTransaction = void 0;
const moment = require("moment");
class BankTransaction {
    constructor(exchangeRowJson) {
        this.referenceNo = exchangeRowJson['Chq/Ref Number'];
        this.transactionDate = this.getParsedDate(exchangeRowJson['Date']);
        this.actionTitle = exchangeRowJson['Narration'];
        this.balanceAmount = +exchangeRowJson['Closing Balance'];
        this.setTranscationTypeAndAmount(+exchangeRowJson['Debit Amount'], +exchangeRowJson['Credit Amount']);
    }
    setTranscationTypeAndAmount(debitAmount, creditAmount) {
        if (debitAmount > 0) {
            this.transactionType = TransactionType.DEBIT;
            this.transactionAmount = +debitAmount;
        }
        else if (creditAmount > 0) {
            this.transactionType = TransactionType.CREDIT;
            this.transactionAmount = +creditAmount;
        }
    }
    /**
     * Convert a "dd/MM/yyyy" string into a Date object
     */
    getParsedDate(dateString) {
        return moment(dateString, 'dd/MM/YY').toDate();
    }
}
exports.BankTransaction = BankTransaction;
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
//# sourceMappingURL=BankTransaction.js.map