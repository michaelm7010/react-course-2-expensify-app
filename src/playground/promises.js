const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ name: 'Andrew', age:  60 });
        // reject('Something went awry');
    }, 5000);
});


console.log('Before resolve ...');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise');
            // reject('Something went awry');
        }, 5000);
    });
    ;
}).then((str) => {
    console.log('does this run?', str);
}).catch((error) => {
    console.log('error: ', error);
});


console.log('After resolve ...');