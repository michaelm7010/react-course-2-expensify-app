import { login, logout } from '../../actions/authentication';

test('should set up login action object', () => {
    const testUserId = 'abc123';
    const action = login(testUserId);
    expect(action).toEqual({
        type:  'LOGIN',
        userId:  testUserId
    });
});

test('should set up logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type:  'LOGOUT'
    });
});

