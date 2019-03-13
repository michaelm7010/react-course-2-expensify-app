import * as firebase from 'firebase';
// import moment from 'moment';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// // child_removed
// database.ref('expenses')
//   .on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

//   // child changed
// database.ref('expenses')
//   .on('child_changed', (snapshot) => {
//     console.log('child changed:  ', snapshot.key, snapshot.val());
//   });

//   database.ref('expenses')
//   .on('child_added', (snapshot) => {
//     console.log('child added:  ', snapshot.key, snapshot.val());
//   });

// const testExpenses = [{
//     description:  'Gum',
//     note:  '',
//     amount:  195,
//     createdAt:  0
// }, {
//     description:  'Rent',
//     note:  '',
//     amount:  109500,
//     createdAt:  moment(0).subtract(4, 'days').valueOf()
// }, {
//     description:  'Credit Card',
//     note:  'This is a note',
//     amount:  4500,
//     createdAt:  moment(0).add(4, 'days').valueOf()
// }];

// database.ref('expenses').push(testExpenses[0]);
// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id:  childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     });

// const onValueChange = database.ref()
//   .on('value', (snapshot) => {
//       const user = snapshot.val();
//       console.log(`${user.name} is a ${user.job.title} at ${user.job.company}.`);
// }, (error) => {
//     console.log('Error with data fetching:  ', error);
// });


// database.ref('notes/-LZkxf6LGFWmYt9xa1Wt').remove();

// database.ref('notes').push({
//     title:  'Course topics',
//     body:  'React Native, Angular, Python'
// });

// const firebaseNotes = {
//     notes:  {
//         dafdsa: {
//             title:  'First note',
//             body:  'This is my note'
//         },
//         asdfasd: {
//             title:  'Second note',
//             body:  'This is my second note'
//         }
//     }
// }

// const notes = [{
//     id:  '12',
//     title:  'First note',
//     body:  'This is my note'
// }, {
//     id:  '761ase',
//     title:  'Another note',
//     body:  'This is my other note'

// }];

// database.ref('notes').set(notes);

// const onValueChange = database.ref()
//   .on('value', (snapshot) => {
//       const user = snapshot.val();
//       console.log(`${user.name} is a ${user.job.title} at ${user.job.company}.`);
// }, (error) => {
//     console.log('Error with data fetching:  ', error);
// });

// database.ref().set({
//     name:  'Michael Mann',
//     age:  60,
//     stressLevel:  6,
//     job:  {
//         title:  'Software developer',
//         company:  'Google'
//     },
//     location:  {
//         city:  'Austin',
//         state:  'Texas',
//         country:  'United States'
//     }
// }).then(() => {
//     console.log('Data is saved.');
// }).catch((error) => {
//     console.log('This failed:  ', error);
// });


// database.ref().update({
//     stressLevel:  9,
//     'job/company':  'Amazon',
//     'location/city':  'Seattle',
//     'location/state':  'Washington'
// });

// database.ref()
//   .remove()
//   .then(() => { 
//     console.log('data removed');
//   }).catch((error) => {
//       console.log('error deleting:  ', error);
//   });