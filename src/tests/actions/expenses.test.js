import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense,
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const testUserId = 'abc123';
const defaultAuthenticationState = { 
    authentication:  { 
        userId:  testUserId 
    } 
};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${testUserId}/expenses`).set(expensesData).then(() => done());
});

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type:  'REMOVE_EXPENSE',
        id:  '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthenticationState);
    const id = expenses[2].id;

    // remove expense
    store.dispatch(startRemoveExpense({ id })).then(() => {
        // confirm correct action used to remove expense
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:  'REMOVE_EXPENSE',
            id
        });

        // attempt to retrieve expense
        return database.ref(`users/${testUserId}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

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

test('should edit expense in database', (done) => {
    const store = createMockStore(defaultAuthenticationState);
    const id = expenses[0].id;
    const updates = {
        amount:  21045,
        note:  '20 cases'
    };

    // dispatch edit expense action
    store.dispatch(startEditExpense(id, updates)).then(() => {
        // confirm correct action used to edit expense
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:  'EDIT_EXPENSE',
            id,
            updates
        });
        // attempt to retrieve expense
        return database.ref(`users/${testUserId}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        // because id is in test object, but not in data read from database,
        // need to craft an object to match updated test object
        const completeExpense = {
            id,
            ...snapshot.val()
        };
        expect(completeExpense).toEqual({
            ...expenses[0],
            ...updates
        });
        // or, can simply compare values that were updated
        expect(snapshot.val().note).toBe(updates.note);
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

test('should set up add-expense object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type:  "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthenticationState);
    const expenseData = {
        description:  'mouse',
        amount:  3000,
        note:  'this one is better',
        createdAt:  1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:  'ADD_EXPENSE',
            expense:  {
                id:  expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${testUserId}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthenticationState);
    const expenseDefaults = {
        description:  '',
        amount:  0,
        note:  '',
        createdAt:  0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:  'ADD_EXPENSE',
            expense:  {
                id:  expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`users/${testUserId}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

test('should set up set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:  'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthenticationState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:  'SET_EXPENSES',
            expenses
        });
        done();
    });
});

