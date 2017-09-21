const fs = require('fs');
const param = process.argv;

async function exportCSV(path) {

    let str = fs.readFileSync(path, 'utf8');
    let resultRecords = [];
    const recordsList = str.split("\n");
    const titles = recordsList.shift().split(';');

    recordsList.forEach(line => {
        let item = {};
        const data = line.split(';');
        titles.forEach((el, i) => item[el] = data[i]);
        resultRecords.push(item);
    });

    return resultRecords;

}

module.exports = exportCSV;