const s = require('@json-spec/core');
const uidSpec = require('./uid');

const enterroomSpec = s.object({
    required: {
        uid : uidSpec
    }
});

module.exports = enterroomSpec;
