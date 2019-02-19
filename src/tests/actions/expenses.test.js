import moment from 'moment';
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type:  'REMOVE_EXPENSE',
        id:  '123abc'
    });
})

test('should set up edit expense action object', () => {
    const testExpense = {
        id:  '123',
        description:  'coffee',
        amount:  1234,
        note:  'This is a note',
        createdAt:  moment('2018-01-01')
    }
    const action = editExpense('123', testExpense);
    expect(action).toEqual({
        type:  'EDIT_EXPENSE',
        id:  '123',
        updates:  {
            id:  '123',
            description:  'coffee',
            amount:  1234,
            note:  'This is a note',
            createdAt:  moment('2018-01-01')
            }
    });
});

test('should set up add-expense object with provided values', () => {
    const expenseData = {
        description:  'coffee',
        amount:  1234,
        note:  'This is a note',
        createdAt:  moment('2018-01-01')
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type:  "ADD_EXPENSE",
        expense: {
            id:  expect.any(String),
            ...expenseData
        }
    });
});

test('should set up add-expense object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type:  "ADD_EXPENSE",
        expense: {
            id:  expect.any(String),
            description:  '', 
            note:  '', 
            amount:  0, 
            createdAt:  0 
        }
    });
});