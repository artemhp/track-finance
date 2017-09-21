const firebase = require('firebase');
const wallet = require('./wallet.js');

// const fs = require('fs');
const dateFormat = require('dateformat');
// const param = process.argv;
// const path = param[param.length-1];
// const path = __dirname + '/wallet.txt'

const wid = '-KuYqOQvEX-BzSXyyTuC';
const user = 'vtAGQEZMv4fHqhXq0bt8WEZ0rmG2';

const config = {
    apiKey: "AIzaSyBs2rH4kaW2qQU8hAPkLm669zOQNkj5V0I",
    authDomain: "finance-tracker-d9c2f.firebaseapp.com",
    databaseURL: "https://finance-tracker-d9c2f.firebaseio.com",
    projectId: "finance-tracker-d9c2f",
    storageBucket: "finance-tracker-d9c2f.appspot.com",
    messagingSenderId: "242139475776"
};

const app = firebase.initializeApp(config);

const db = firebase.database();
const refRecords = db.ref("records/" + wid);
const refCaregories = db.ref("wallets/" + wid + '/category');

const refWalletStatDaily = db.ref("wallets/" + wid + '/statistic/daily');
const refWalletStatMonthly = db.ref("wallets/" + wid + '/statistic/monthly');

const refWalletStat = db.ref("wallets/" + wid + '/stats');

let mappedCategories = {};

refCaregories.once("value").then(snap => {
    let categories = snap.val();
    for (let catKey in categories) {
        mappedCategories[categories[catKey]['title']] = catKey;
    }
    wallet(__dirname + '/wallet.txt').then(str => parse(str));
});

function getCategory(line) {
    const categoryName = line.category;
    return {
        'name': line.category,
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
    currentDate = getCurrentDate(line.date);

    function setSatistic(current) {
        const amount = Math.abs(line.amount);
        if (line.type.toLowerCase() == 'expenses') {
            return current - amount;
        } else {
            return current + amount;
        }
    }

    let balance = refWalletStat.child('balance').transaction(setSatistic);
    let date = refWalletStat.child('date').transaction(() => {
        let now = new Date(line.date);
        return +now;
    });
    let total = refWalletStat.child('total').transaction(current => {
        return current++;
    })

    return Promise.all([balance, date, total])
}

function setCategoryStatistics(line) {
    const currentDate = getCurrentDate(line.date);
    const daily = refCaregories.child(mappedCategories[line.category]).child('statistic/daily').child(line.type.toLowerCase()).child(currentDate.day);
    const monthly = refCaregories.child(mappedCategories[line.category]).child('statistic/monthly').child(line.type.toLowerCase()).child(currentDate.month);

    function setSatistic(current) {
        const amount = Math.abs(line.amount);
        return current + amount;
    }

    const dailyPromise = daily.transaction(setSatistic);
    const monthlyPromise = monthly.transaction(setSatistic);

    return Promise.all([dailyPromise, monthlyPromise])
}

function setStatistics(line) {

    currentDate = getCurrentDate(line.date);

    const daily = refWalletStatDaily.child(line.type.toLowerCase()).child(currentDate.day);
    const monthly = refWalletStatMonthly.child(line.type.toLowerCase()).child(currentDate.month);

    function setSatistic(current) {
        const amount = Math.abs(line.amount);
        return current + amount;
    }

    const dailyPromise = daily.transaction(setSatistic);
    const monthlyPromise = monthly.transaction(setSatistic);

    return Promise.all([dailyPromise, monthlyPromise]);

}

function getObj(line) {

    let categoryName = line.category;

    var date = new Date(line.date);
    var dateTimeStamp = date.getTime();
    var formattedDate = dateFormat(date, "yyyy-mm-dd");

    var obj = {
        amount: Math.abs(line.amount),
        category: categoryName,
        categoryId: mappedCategories[categoryName],
        currency: line.currency,
        date: formattedDate,
        location: line.note,
        note: '',
        timestamp: dateTimeStamp,
        title: "First Wallet",
        type: line.type.toLowerCase(),
        wid: wid
    }

    return obj;
}

function writeRecord(line) {
    var newRecord = refRecords.push();
    return newRecord.set(getObj(line));
}

function parse(res) {

    let arrayCategoryPromises = [];

    res.forEach(line => {
        let category = getCategory(line);

        if (!category.id) {
            let newCategory = refCaregories.push();
            let setCategory = newCategory.set({
                'icon': 'rocket',
                'title': category.name,
                'user': user
            });
            arrayCategoryPromises.push(setCategory);

            mappedCategories[category.name] = newCategory.getKey();
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
}