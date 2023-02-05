const { JSDOM } = require('jsdom');

const crawlPage = async (baseURL, currentURL, pages) => {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return pages;
    } else {
        pages[normalizedURL] = 1;
    }
    console.log(`actively crawling ${currentURL}`);

    try {
        const response = await fetch(currentURL);
        const htmlBody = await response.text();

        if (response.status > 399) {
            console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`);
            return pages;
        } else if (htmlBody === null) {
            console.log(`no html body found on page: ${currentURL}`);
            return pages;
        } else if (htmlBody.length === 0) {
            console.log(`empty html body found on page: ${currentURL}`);
            return pages;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`not an html page: ${currentURL}`);
            return pages;
        }

        //console.log(htmlBody);
        const urls = getURLsFromHTML(htmlBody, baseURL);

        for (const url of urls) {
            pages = await crawlPage(baseURL, url, pages);
        }
    } catch (e) {
        console.log(`error in fetch: ${e.message}, on page: ${currentURL}`);
    }
    return pages;
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody, { baseURL });
    const links = dom.window.document.querySelectorAll('a');

    const urls = Array.from(links)
        .map(link => link.href ? link.href.slice(0, 1) === '/' ? `${baseURL}${link.href}` : link.href : null)
        .filter(url => url !== null)
        .filter(url => {
            try {
                const test = new URL(url)
                return true;
            } catch (e) {
                console.log(`${e.message}:  ${url}`);
                return false;
            }
        });

    return urls;
}
const normalizeURL = (urlStr) => {
    const urlObj = new URL(urlStr);
    //console.log(urlObj);
    const { hostname, pathname } = urlObj;
    const pathNameLower = pathname.toLowerCase();
    const hostPath = `${hostname}${pathNameLower}`;

    if (hostPath.length > 0 && hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};
/*
const crawlPage = async (baseURL) => {
    const normalizedURL = normalizeURL(baseURL);
    const response = await fetch(normalizedURL);
    const htmlBody = await response.text();
    const urls = getURLsFromHTML(htmlBody, normalizedURL);
    return urls;
}

*/
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};