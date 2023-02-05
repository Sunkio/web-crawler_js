const { sortPages } = require('./report');
const { test, expect } = require('@jest/globals');

test('sortPages should sort 2 pages by highest count', () => {
    const pages = {
        'http://www.example.com': 3,
        'http://www.example.com/1': 2,
    };
    const actual = sortPages(pages);
    const expected = [
        ['http://www.example.com', 3],
        ['http://www.example.com/1', 2],
    ];
    expect(actual).toEqual(expected);
});

test('sortPages should sort 5 pages by highest count', () => {
    const pages = {
        'http://www.example.com': 3,
        'http://www.example.com/1': 9,
        'http://www.example.com/2': 5,
        'http://www.example.com/3': 1,
        'http://www.example.com/4': 4,
    };
    const actual = sortPages(pages);
    const expected = [
        ['http://www.example.com/1', 9],
        ['http://www.example.com/2', 5],
        ['http://www.example.com/4', 4],
        ['http://www.example.com', 3],
        ['http://www.example.com/3', 1],
    ];
    expect(actual).toEqual(expected);
});
