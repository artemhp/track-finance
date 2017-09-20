var firebase = require('firebase');
var fs = require('fs');
var param = process.argv;
// var path = param[param.length-1];
var path = __dirname + '/wallet.txt'
var wallet = '-Ks8ImbZno4lzuN6ixcg';

 var config = {
    apiKey: "AIzaSyBs2rH4kaW2qQU8hAPkLm669zOQNkj5V0I",
    authDomain: "finance-tracker-d9c2f.firebaseapp.com",
    databaseURL: "https://finance-tracker-d9c2f.firebaseio.com",
    projectId: "finance-tracker-d9c2f",
    storageBucket: "finance-tracker-d9c2f.appspot.com",
    messagingSenderId: "242139475776"
  };

  var app = firebase.initializeApp(config);
  
var db = firebase.database();
var refRecords = db.ref("records/"+wallet);
var refCaregories = db.ref("wallets/"+wallet+'/category');

refCaregories.once("value").then(snap => {
    let categories = snap.val();
    let mappedCategories = {};
    for (let catKey in categories) {
        mappedCategories[categories[catKey]['title']] = catKey;
    }   
    readFromFile(mappedCategories);
});
  
function readFromFile (mappedCategories) {
    fs.readFile(path, 'utf8', function (err,str) {
        
        var re = new RegExp('(Готівка);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);', 'g');
        var res = str.match(re);
        
        res.forEach((line)=>{
            var data = line.split(';');    
            let categoryName = data[1];
            if(categoryName && mappedCategories[categoryName]) {
                console.log(data[1]);
                var obj = {
                    amount: Math.abs(categoryName),
                    category: categoryName,
                    categoryId: mappedCategories[categoryName],
                    currency: "UAH",
                    date: "2017-08-22",
                    location: "WOG",
                    note: "Test",
                    timestamp: 1503349200000,
                    title: "First Wallet",
                    type: "income",
                    wid: wallet 
                }
            }           else {
                //console.log(categoryName);
            }                         
        });
    
    });
}