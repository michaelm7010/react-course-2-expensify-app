import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const formatExpenses = (expensesTotal) => 
    numeral(expensesTotal / 100).format('$0,0.00');

const expenseWord = (expenseCount) => expenseCount === 1 ? 'expense' : 'expenses';
 
export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
    <div>
        {
            expenseCount === 0 ? (
                <h1>No expenses meeting filter criteria</h1>
            ) : (
                <h1>Viewing {expenseCount} {expenseWord(expenseCount)} totaling {formatExpenses(expensesTotal)}</h1>
            )                
        }
    </div>
);

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount:  visibleExpenses.length,
        expensesTotal:  selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
