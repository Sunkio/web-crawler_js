const main = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline.question(`Which URL do you want to crawl?`, urlName => {
        const trimmedUrl = urlName.trim();
        if (!urlName) {
            console.log('Please try again and enter a URL');
        } else if (trimmedUrl.includes(' ')) {
            console.log('Please try again and enter only one URL');
        } else if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
            console.log(`Crawling ${trimmedUrl}...`);
        } else {
            console.log('Please try again and enter a valid URL');
        }
        readline.close();
        return;
    });
}

main();