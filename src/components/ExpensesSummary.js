import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const formatExpenses = (expensesTotal) => 
    numeral(expensesTotal / 100).format('$0,0.00');

const expenseWord = (expenseCount) => expenseCount === 1 ? 'expense' : 'expenses';
 
export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord(expenseCount)} totaling <span>{formatExpenses(expensesTotal)}</span></h1>
            <div className="page-header__actions">
                <Link to="/create" className="button">Add Expense</Link>
            </div>
        </div>
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
