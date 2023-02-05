const main = () => {

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    (function getValidInput () {
        readline.question(`Which URL do you want to crawl?`, urlName => {
            const trimmedUrl = urlName.trim();
            let validUrl = false;

            if (trimmedUrl.includes(' ')) {
                console.log('Please try again and enter only one URL');
                getValidInput();
            } else if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
                console.log(`Crawling ${trimmedUrl}...`);
                readline.close();
                return;
            } else {
                console.log('Please try enter a valid URL');
                getValidInput();
            }
        });
    })();
}

main();