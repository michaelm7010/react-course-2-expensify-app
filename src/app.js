import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const expense1 = store.dispatch(addExpense({ description:  'Water bill', amount: 4500 }));
const expense2 = store.dispatch(addExpense({ description:  'Gas bill', createdAt:  1000 }));
const expense3 = store.dispatch(addExpense({ description:  'Rent', amount: 109500 }));

// setTimeout(() => {
//     console.log("removing expense", expense2.expense);
//     console.log("id", expense2.expense.id);
//     store.dispatch(removeExpense(expense2.expense));
// }, 1500);
// console.log("expense 2", expense2);
// const updatedExpense2 = {
//     ...expense2.expense,
//     amount:  149
// };
// console.log("updated expense 2", updatedExpense2);

// store.dispatch(editExpense(expense2.expense.id, updatedExpense2));
// console.log("updated expense 2", updatedExpense2);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));