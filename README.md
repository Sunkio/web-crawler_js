# Web Crawler

https://wegslane.dev 

## Description
## How to use it
### Prerequisits
You must have Node.js installed on your computer. This project was developed using Node.js v18.7.0

### Installation
Clone the repository to your computer and run the following command in the root directory of the project to install the dependencies:
``` bash
npm ci
```

If you encounter any problems with the installation, first check whether you're using a matching Node.js version.
This project was build with node V18.7.0. If you use nvm, it should be running automatically.

If you're Node versione isn't an issue, try deleting the package-lock.json file, and reinstall the dependencies by running the following commands:

``` bash
npm init - to initialize the project
npm install jest --save-dev - to install jest for testing
npm install jsdom
```
### Usage


npm start - to execute the project starting with index.js as an entrypoint


<!--
Add CSV file to the project:
https://www.brcline.com/blog/outputting-a-csv-file-from-node-js

try renaming index.js to server.js and then run npm start (delete index.js from json file)
References: (cp suggestion:) https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
(my finding:) https://stackoverflow.com/questions/36002413/conventions-for-app-js-index-js-and-server-js-in-node-js
-->