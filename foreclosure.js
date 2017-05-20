'use strict';

var steve;

var stevesLoan;

var month = 0;

var monthsUntilEvicted;

function loan() {

  var account = {

    borrowed : 550000,

    balance : 286000,

    monthlyPayment : 1700,

    defaulted : 0,

    defaultsToForeclose : 5,

    foreclosed : false

  }; // close account

  function missPayment() {

    account.defaulted += 1;

    if (account.defaulted >= account.defaultsToForeclose) {

      account.foreclosed = true;

    }
  } // close missPayment

  return {

    getBalance : function() {

      return account.balance;

    },

    receivePayment : function(amount) {

      if (amount < account.monthlyPayment) {

        missPayment();

      }

      return account.balance -= amount;
    },

    getMonthlyPayment : function() {

      return account.monthlyPayment;
    },

    isForeclosed : function() {

      return account.foreclosed;

    }

  };

} //end of loan function

function borrower(loan) {

  var account = {

    monthlyIncome : 1350,

    funds : 2800,

    loan : loan

  };

  return {

    getFunds : function() {

      return account.funds;
    },

    makePayment : function() {

      var getPay = loan.getMonthlyPayment();

      if (account.funds > getPay) {

        loan.receivePayment(getPay);

        return account.funds -= getPay ;

      }else {
        loan.receivePayment(account.funds);

        return account.funds = 0;
      }

    },

    payDay : function() {

      return account.funds += account.monthlyIncome;
    }

  };
} // end of borrower function

stevesLoan = loan();

steve = borrower(stevesLoan);

while (stevesLoan.isForeclosed() !== true) {

  var stevesBalance = stevesLoan.getBalance() ;

  if (stevesBalance > 0) {

    steve.payDay();

    steve.makePayment();

    month++;

  }else {

    stevesBalance = 0;
  }

} // close while loop

monthsUntilEvicted = month;