import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

const displayExpenses = (props) => 
    numeral((expensesTotal(props.expenses)) / 100).format('$0,0.00');
 
export const ExpensesSummary = (props) => (
    <div>
        {
            !props.expenses || props.expenses.length === 0 ? (
                <p>No expenses meeting filter criteria</p>
            ) : (
                <p>Viewing {props.expenses.length} {props.expenses.length === 1 ? 'expense' : 'expenses'} totaling {displayExpenses(props)}</p>
            )                
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses:  selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
