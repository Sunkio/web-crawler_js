'use strict'
const fs = require('fs');
const { Parser } = require('json2csv');

const createFilename = (typeOfLinks, trimmedURL) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const trimmedURLArr = trimmedURL.replace('.', '-').split('/');
    return `./reports/${trimmedURLArr[2]}_${typeOfLinks}_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.csv`;
}

const createCsv = (sortedPages, typeOfLinks, trimmedURL) => {
    const fields = ['url', 'count'];
    const pagesObj = sortedPages.map((page) => {
        return {
            url: page[0],
            count: page[1]
        }
    });
    const csv = new Parser({fields});
    fs.writeFile(createFilename(typeOfLinks, trimmedURL), csv.parse(pagesObj) , function (err) {
        if (err) throw err;
        console.log(`New ${typeOfLinks} links CSV file created and saved in reports directory!`);
    });
}

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    })
    return pagesArr;
}

function printReport(pages, extPages, trimmedURL) {
    const sortedPages = sortPages(pages);

    const sortedExtPages = sortPages(extPages);
    console.log(`
        INTERNAL LINKS - CRAWL REPORT
     ====================================
    `);
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} links to: ${page[0]}`);
    }

    console.log(`
        INTERNAL LINKS - END OF REPORT
     ====================================
        `);

    createCsv(sortedPages, 'internal', trimmedURL);

    if (sortedExtPages.length < 1) {
        console.log(`
        EXTERNAL LINKS - CRAWL REPORT
     ====================================
        `);
        console.log('No external links found!');
        console.log(`
        EXTERNAL LINKS - END OF REPORT
     ====================================
        `);
        console.log('No external links CSV file created since there aren\'t any links!');
        return;
    } else {

    console.log(`
        EXTERNAL LINKS - CRAWL REPORT
     ====================================
    `);
    for (const page of sortedExtPages) {
        console.log(`Found ${page[1]} links to: ${page[0]}`);
    }

    console.log(`
        EXTERNAL LINKS - END OF REPORT
     ====================================
        `);

        createCsv(sortedExtPages, 'external', trimmedURL);
    }



}

module.exports = {
    sortPages,
    printReport
}