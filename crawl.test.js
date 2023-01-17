// use regex to match the url - one test for each possible version(?) of the url
// take lane's personal blog as a test instance (what you send into the test function)
// and test for everything else you can think of


const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('normalizeURL should return a string', () => {
    expect(typeof normalizeURL('https://www.google.com/')).toBe('string');
});
