const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL should only return a hostname/pathname string', () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('normalizeURL should trim a slash at the end', () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('normalizeURL should turn uppercase letters to lowercase', () => {
    const input = "https://blog.BOOT.dev/PATH";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('normalizeURL should work with a regular HTTP URL too', () => {
    const input = "http://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML should return an array of URLs from absolute URLs', () => {
    const inputHTML =
        `<html>
            <body>
                <a href="https://blog.boot.dev/path">Blog</a>
                <a href="https://blog.boot.dev/about">About</a>
            </body>
        </html>`;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path", "https://blog.boot.dev/about"];
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
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path", "https://blog.boot.dev/about"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML should not return invalid URLs', () => {
    const inputHTML =
        `<html>
            <body>
                <a href="https://blog.boot.dev/path">Blog</a>
                <a href="https://blog.boot.dev/about">About</a>

                <a href="hah, not a URL!">No Link</a>
            </body>
        </html>`;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ["https://blog.boot.dev/path", "https://blog.boot.dev/about"];
    expect(actual).toEqual(expected);
});