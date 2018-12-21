import test from 'ava';
import RoomInfo from '../roominfo';
const randomstring = require('crypto-random-string');

test('seedIsValid', t => {
    const r = new RoomInfo("");
    t.true(!r.seedIsValid());
    r.seed_ = randomstring(1250);
    t.true(r.seedIsValid());
    r.seed_ = randomstring(1249);
    t.true(!r.seedIsValid());
})
