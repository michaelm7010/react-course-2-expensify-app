import { firebase, googleAuthProvider } from '../firebase/firebase';

// action generator for login action
export const login = (userId) => ({
    type:  'LOGIN',
    userId
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

// action generator for logout action
export const logout = () => ({
    type:  'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};