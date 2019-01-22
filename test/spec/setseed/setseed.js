import test from 'ava';
import setseedSpec from '../../../spec/setseed';
const fs = require('fs');
const s = require('@json-spec/core');

test('setseed', t => {
    const seedInfo = JSON.parse(fs.readFileSync('./test/spec/setseed/setseed.example.json', 'utf8'));
    t.true(s.isValid(setseedSpec, seedInfo));
})
