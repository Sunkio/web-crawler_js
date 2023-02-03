const { JSDOM } = require('jsdom');

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody, { baseURL });
    const links = dom.window.document.querySelectorAll('a');
    const urls = Array.from(links).map(link => link.href);
    return urls;
}

const normalizeURL = (urlStr) => {
    const urlObj = new URL(urlStr);
    console.log(urlObj);
    const { hostname, pathname } = urlObj;
    const pathNameLower = pathname.toLowerCase();
    const hostPath = `${hostname}${pathNameLower}`;

    if (hostPath.length > 0 && hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};

module.exports = {
    normalizeURL,
    getURLsFromHTML
};