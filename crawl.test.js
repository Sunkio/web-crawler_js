const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

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
