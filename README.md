# Web Crawler CLI
A simple web crawler CLI that takes a URL as input and outputs all the links on the website, ordered by no. of occurrence. The output is seperated into internal and external links and exported to .csv files.

## Description
This CLI app crawls the basic URL, the user provides it with, as well as all its subpages. It then divides the links into internal and external ones. Internal links are links that point to other pages on the same domain. External links are links that point to other domains.
For each link, it counts the number of occurrences and outputs the final result in descending order. The output is divided into internal and external links and printed to the terminal, plus exported to .csv files.

## How to use it

### Prerequisits
You must have Node.js installed on your computer. This project was developed using Node.js v18.7.0
node -v - to check your node version
nvm run  
### Installation
Clone the repository to your computer and run the following command in the root directory of the project to install the dependencies:
``` bash
npm ci
```
#### In case of problems with the installation
If you encounter any problems with the installation, first check whether you're using a matching Node.js version: `node -v`
This project was build with node V18.7.0. If you use nvm, run `nvm run` to switch to the correct version.

If your Node version isn't an issue, try deleting the package-lock.json file, and reinstall the dependencies by running the following commands:

``` bash
npm init  # to initialize the project
npm install jest --save-dev  # to install jest for testing
npm install jsdom
npm install json2csv
```
### Usage
Run the following command in the root directory of the project to start the CLI:
``` bash
npm start 
```
Then simply follow the instructions.
The program will ask you for a URL. Enter the URL you want to crawl. The program will then crawl the URL and all its subpages. It will then output the results to the terminal and export them to .csv files. The files will be saved in the reports directory.


## To Do
- The program currently treats www.example.com and example.com as different domains. This should be fixed.
- Optional: Add concurrency to speed up the crawling process. Currently, it only crawls one page at a time which is why it takes the program quite a long time to crawl larger sites with lots of subpages.
- Optional: Have it create a broken link report. This can be useful to analyze the health of a website.
- Optional: Have it create a sitemap. This can be useful to get a more intuitive overview all the pages on a website.

## How to Contribute
Contributions are always welcome! Please check the Code of Conduct .

## License
This project is licensed under the MIT License.

## Support
If you have any questions or need help getting started, please open an issue in the repository or contact me on Twitter: @tanja_codes