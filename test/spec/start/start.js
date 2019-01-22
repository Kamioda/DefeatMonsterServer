import test from 'ava';
import startSpec from '../../../spec/start';
const fs = require('fs');
const s = require('@json-spec/core');

test('start', t => {
    const startinfo = JSON.parse(fs.readFileSync('./test/spec/start/start.example.json', 'utf8'));
    t.true(s.isValid(startSpec, startinfo));
})
