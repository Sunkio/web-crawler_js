const { JSDOM } = require('jsdom');

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
        })


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