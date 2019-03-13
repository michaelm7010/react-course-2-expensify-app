import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authenticationReducer from '../reducers/authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
// Store creation
    const store = createStore(
        combineReducers({
            expenses:  expensesReducer,
            filters:  filtersReducer,
            authentication:  authenticationReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}
