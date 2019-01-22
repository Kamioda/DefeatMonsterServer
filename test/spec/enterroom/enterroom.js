import test from 'ava';
import enterroomSpec from '../../../spec/enterroom';
const fs = require('fs');
const s = require('@json-spec/core');

test('enterroom', t => {
    const enterroominfo = JSON.parse(fs.readFileSync('./test/spec/enterroom/enterroom.example.json', 'utf8'));
    t.true(s.isValid(enterroomSpec, enterroominfo));
})
