'use strict'
const fs = require('fs');
const { Parser } = require('json2csv');


const createCsv = (sortedPages) => {
    const fields = ['url', 'count'];
    const pagesObj = sortedPages.map((page) => {
        return {
            url: page[0],
            count: page[1]
        }
    });
    const csv = new Parser({fields});
    fs.writeFile('./reports/crawl-report.csv', csv.parse(pagesObj) , function (err) {
        if (err) throw err;
        console.log('CSV file created and saved in reports directory!');
    });
}

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    })

    return pagesArr;
}

function printReport(pages) {
    const sortedPages = sortPages(pages);
    console.log(`
    CRAWL REPORT
    ============
    `);
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} links to: ${page[0]}`);
    }

    console.log(`
        END OF REPORT
        ============
        `);
    createCsv(sortedPages);
}

module.exports = {
    sortPages,
    printReport
}