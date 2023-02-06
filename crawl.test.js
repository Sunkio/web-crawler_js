const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL should only return a hostname/pathname string', () => {
    const input = "https://blog.tanjaschmidt.com/path";
    const actual = normalizeURL(input);
    const expected = "blog.tanjaschmidt.com/path";
    expect(actual).toEqual(expected);
});

test('normalizeURL should trim a slash at the end', () => {
    const input = "https://blog.tanjaschmidt.com/path/";
    const actual = normalizeURL(input);
    const expected = "blog.tanjaschmidt.com/path";
    expect(actual).toEqual(expected);
});

test('normalizeURL should turn uppercase letters to lowercase', () => {
    const input = "https://blog.TANJASCHMIDT.com/PATH";
    const actual = normalizeURL(input);
    const expected = "blog.tanjaschmidt.com/path";
    expect(actual).toEqual(expected);
});

test('normalizeURL should work with a regular HTTP URL too', () => {
    const input = "http://blog.tanjaschmidt.com/path";
    const actual = normalizeURL(input);
    const expected = "blog.tanjaschmidt.com/path";
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML should return an array of URLs from absolute URLs', () => {
    const inputHTML =
        `<html>
            <body>
                <a href="https://blog.tanjaschmidt.com/path">Blog</a>
                <a href="https://blog.tanjaschmidt.com/about">About</a>
            </body>
        </html>`;
    const inputBaseURL = "https://blog.tanjaschmidt.com";
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.tanjaschmidt.com/path", "https://blog.tanjaschmidt.com/about"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML should return an array of URLs from relative URLs', () => {
    const inputHTML =
        `<html>
            <body>
                <a href="/path">Blog</a>
                <a href="/about">About</a>
            </body>
        </html>`;
    const inputBaseURL = "https://blog.tanjaschmidt.com";
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.tanjaschmidt.com/path", "https://blog.tanjaschmidt.com/about"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML should not return invalid URLs', () => {
    const inputHTML =
        `<html>
            <body>
                <a href="https://blog.tanjaschmidt.com/path">Blog</a>
                <a href="https://blog.tanjaschmidt.com/about">About</a>

                <a href="hah, not a URL!">No Link</a>
            </body>
        </html>`;
    const inputBaseURL = "https://blog.tanjaschmidt.com";
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.tanjaschmidt.com/path", "https://blog.tanjaschmidt.com/about"];
    expect(actual).toEqual(expected);
});