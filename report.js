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
}


const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    })

    return pagesArr;
}

module.exports = {
    sortPages,
    printReport,
}