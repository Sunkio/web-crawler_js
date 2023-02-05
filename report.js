const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    })

    return pagesArr;
}

module.exports = {
    sortPages
}