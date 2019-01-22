const s = require('@json-spec/core');
const seedSpec = require('./seed');
const uidSpec = require('./uid');

const setseedSpec = s.object({
    required: {
        uid : uidSpec,
        seed : seedSpec
    }
});

module.exports = setseedSpec;
