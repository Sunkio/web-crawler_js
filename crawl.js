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
    normalizeURL
};