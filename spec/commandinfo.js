const s = require('@json-spec/core');
const uidSpec = require('./uid');

const commandinfoSpec = s.object({
    required: {
        uid : uidSpec
    }
});

module.exports = commandinfoSpec;
