import authenticationReducer from '../../reducers/authentication';

test('should set default state', () => {
    const state = authenticationReducer(undefined, { type:  '@@INIT' });
    expect(state).toEqual({});
});

test('should log in user', () => {
    const testUserId = 'abc123';
    const action = { 
        type:  'LOGIN', 
        userId:  testUserId
    };
    const state = authenticationReducer({}, action);
    expect(state).toEqual({ userId:  testUserId });
});

test('should log out user', () => {
    const action = { 
        type:  'LOGOUT'
    };
    const state = authenticationReducer({ userId: 'abc123' }, action);
    expect(state).toEqual({});
});
