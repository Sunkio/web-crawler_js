const { JSDOM } = require('jsdom');

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');

    const urls = Array.from(links)
        .map(link => link.href ? (link.href.startsWith('/') ? `${baseURL}${link.href}` : link.href) : null)
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
    const { hostname, pathname } = urlObj;
    const pathNameLower = pathname.toLowerCase();
    const hostPath = `${hostname}${pathNameLower}`;

    if (hostPath.length > 0 && hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};

const crawlPage = async (baseURL, currentURL, pages, extPages) => {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    const normalizedURL = normalizeURL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        if (extPages[normalizedURL] > 0) {
            extPages[normalizedURL]++;
        } else if (extPages[normalizedURL] !== "mailto:" && extPages[normalizedURL] !== "tel:"
            && extPages[normalizedURL] !== "javascript:void(0)") {
            extPages[normalizedURL] = 1;
        }
        return [pages, extPages];
    }


    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return [pages, extPages];
    } else {
        pages[normalizedURL] = 1;
    }
    console.log(`actively crawling ${currentURL}`);

    try {
        const response = await fetch(currentURL);
        const htmlBody = await response.text();

        if (response.status > 399) {
            console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`);
            return [pages, extPages];
        } else if (htmlBody === null) {
            console.log(`no html body found on page: ${currentURL}`);
            return [pages, extPages];
        } else if (htmlBody.length === 0) {
            console.log(`empty html body found on page: ${currentURL}`);
            return [pages, extPages];
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`not an html page: ${currentURL}`);
            return [pages, extPages];
        }

        const urls = getURLsFromHTML(htmlBody, baseURL);

        for (const url of urls) {
            [pages, extPages] = await crawlPage(baseURL, url, pages, extPages);
        }
    } catch (e) {
        console.log(`error in fetch: ${e.message}, on page: ${currentURL}`);
    }
    return [pages, extPages];
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};