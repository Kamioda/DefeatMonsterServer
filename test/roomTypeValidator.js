import test from 'ava';
import roomTypeValidator from '../roomTypeValidator';

test('roomTypeIsValid', t => {
    t.false(roomTypeValidator(0));
    t.true(roomTypeValidator(1));
    t.true(roomTypeValidator(2));
    t.false(roomTypeValidator(3));
})
