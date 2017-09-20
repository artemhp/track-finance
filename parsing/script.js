var firebase = require('firebase');
var fs = require('fs');
var dateFormat = require('dateformat');
var param = process.argv;
// var path = param[param.length-1];
var path = __dirname + '/wallet.txt'
var wallet = '-Ks8ImbZno4lzuN6ixcg';
var user = 'vtAGQEZMv4fHqhXq0bt8WEZ0rmG2';

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
var refRecords = db.ref("records/" + wallet);
var refCaregories = db.ref("wallets/" + wallet + '/category');

var refWalletStatDaily = db.ref("wallets/" + wallet + '/statistic/daily');
var refWalletStatMonthly = db.ref("wallets/" + wallet + '/statistic/monthly');

var refWalletStat = db.ref("wallets/" + wallet + '/stats');

let mappedCategories = {};

refCaregories.once("value").then(snap => {
    let categories = snap.val();
    for (let catKey in categories) {
        mappedCategories[categories[catKey]['title']] = catKey;
    }
    readFromFile();
});


function setBalance(amount, type) {
    if (type == 'income') {
        return Math.abs(amount);
    } else {
        return Math.abs(amount) * -1.;
    }
}

function setTimeStamp(current, last) {
    if (!last) return current;
    if (current > last) { return current; }
    else { return last; }
}

function getCategory(line) {
    var data = line.split(';');
    let categoryName = data[1];
    return {
        'name': data[1],
        'id': mappedCategories[categoryName]
    };
}

function getCurrentDate(date) {

    const now = new Date(date);

    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const thisMonthTimestamp = +thisMonth;
    const thisDayTimestamp = +thisDay;

    return {
        month: thisMonthTimestamp,
        day: thisDayTimestamp
    }
}

function setStats(line) {
    var data = line.split(';');
    currentDate = getCurrentDate(data[9]);

    function setSatistic(current) {
        let amount = Math.abs(data[3]);
        if (data[5].toLowerCase() == 'expenses') {
            return current - amount;
        } else {
            return current + amount;
        }
    }

    let balance = refWalletStat.child('balance').transaction(setSatistic);
    let date = refWalletStat.child('date').transaction(() => {
        let now = new Date(data[9]);
        return +now;
    });
    let total = refWalletStat.child('total').transaction(current => {
        return current++;
    })

    return Promise.all([balance, date, total])
}

function setCategoryStatistics(line) {
    var data = line.split(';');
    let currentDate = getCurrentDate(data[9]);

    let daily = refCaregories.child(mappedCategories[data[1]]).child('statistic/daily').child(data[5].toLowerCase()).child(currentDate.day);
    let monthly = refCaregories.child(mappedCategories[data[1]]).child('statistic/monthly').child(data[5].toLowerCase()).child(currentDate.month);

    function setSatistic(current) {
        let amount = Math.abs(data[3]);
        return current + amount;
    }

    let dailyPromise = daily.transaction(setSatistic);
    let monthlyPromise = monthly.transaction(setSatistic);

    return Promise.all([dailyPromise, monthlyPromise])
}

function setStatistics(line) {

    var data = line.split(';');

    currentDate = getCurrentDate(data[9]);

    let daily = refWalletStatDaily.child(data[5].toLowerCase()).child(currentDate.day);
    let monthly = refWalletStatMonthly.child(data[5].toLowerCase()).child(currentDate.month);

    function setSatistic(current) {
        let amount = Math.abs(data[3]);
        return current + amount;
    }

    let dailyPromise = daily.transaction(setSatistic);
    let monthlyPromise = monthly.transaction(setSatistic);

    return Promise.all([dailyPromise, monthlyPromise]);

}

function getObj(line) {

    var data = line.split(';');
    let categoryName = data[1];

    var date = new Date(data[9]);
    var dateTimeStamp = date.getTime();
    var formattedDate = dateFormat(date, "yyyy-mm-dd");

    var obj = {
        amount: Math.abs(data[3]),
        category: categoryName,
        categoryId: mappedCategories[categoryName],
        currency: data[2],
        date: formattedDate,
        location: data[8],
        note: '',
        timestamp: dateTimeStamp,
        title: "First Wallet",
        type: data[5].toLowerCase(),
        wid: wallet
    }

    return obj;
}

function writeRecord(line) {
    var newRecord = refRecords.push();
    return newRecord.set(getObj(line));
}

function readFromFile() {
    fs.readFile(path, 'utf8', function (err, str) {

        var reg = /(Готівка);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);([^;]*);/ig;
        var res = str.match(reg);

        let arrayCategoryPromises = [];

        res.forEach((line) => {
            let category = getCategory(line);
            if (!category.id) {
                let newCategory = refCaregories.push();
                let setCategory = newCategory.set({
                    'icon': 'rocket',
                    'title': category.name,
                    'user': user
                });
                arrayCategoryPromises.push(setCategory);
                mappedCategories[category.name] = newCategory;
            }
        });

        let allCategoryPromise = Promise.all(arrayCategoryPromises).then(_ => {
            console.log('Categories!!!');
            let promiseStatisticArray = [];
            res.forEach(line => {
                promiseStatisticArray.push(setStatistics(line));
            })

            Promise.all(promiseStatisticArray).then(_ => {
                console.log('Statistic!!!');
                let statsPromise = [];
                res.forEach(line => {
                    statsPromise.push(setStats(line));
                })
                Promise.all(statsPromise).then(_ => {
                    console.log('Stats!!!');
                    let promiseStatisticCategoryArray = [];
                    res.forEach(line => {
                        promiseStatisticCategoryArray.push(setCategoryStatistics(line));
                    })
                    Promise.all(promiseStatisticCategoryArray).then(_ => {
                        console.log('Stat Category!!!');
                        let promiseRecordsArray = [];
                        res.forEach(line => {
                            promiseRecordsArray.push(writeRecord(line));
                        })
                        Promise.all(promiseRecordsArray).then(_ => {
                            console.log('Records Done !!!')
                        })
                    })
                });
            });

        });
    });
}