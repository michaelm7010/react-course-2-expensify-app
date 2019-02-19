import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type:  '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = { 
        type:  'REMOVE_EXPENSE', 
        id:  expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by not-found-id', () => {
    const action = { 
        type:  'REMOVE_EXPENSE', 
        id:  '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const testExpense = {
        id: '9',
        description:  'Training class',
        note:  'This is a note',
        amount:  1195,
        createdAt:  moment(0).add(14, 'days').valueOf()
    };
    const action = {
        type:  'ADD_EXPENSE',
        expense:  testExpense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, testExpense]);
});

test('should edit an expense', () => {
    const testExpense = {
        id: expenses[1].id,
        description:  'Rent for last month',
        note:  'additional note',
        amount:  109501,
        createdAt:  moment(0).subtract(2, 'days').valueOf()
    };
    const action = {
        type:  'EDIT_EXPENSE',
        id:  expenses[1].id,
        updates:  testExpense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], testExpense, expenses[2]]);
});

test('should not edit expense if id not found', () => {
    const testExpense = {
        id: '-1',
        description:  'Rent for last month',
        note:  'additional note',
        amount:  109501,
        createdAt:  moment(0).subtract(2, 'days').valueOf()
    };
    const action = {
        type:  'EDIT_EXPENSE',
        id:  '9',
        updates:  testExpense.id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses]);
});
