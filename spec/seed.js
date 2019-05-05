const s = require('@json-spec/core');

module.exports = s.array(i => Number.isInteger(i) && i >= 0 && 4294967295 >= i, {
    count : 1250,
    distinct : true
});
