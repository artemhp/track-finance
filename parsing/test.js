const wallet = require('./wallet.js');

wallet(__dirname + '/wallet.txt').then(el => console.log(el));