const s = require('@json-spec/core');
const uidSpec = require('./uid');
const pidSpec = require('./pid');

const getparameterSpec = s.object({
    required: {
        uid : uidSpec,
        pid : pidSpec
    }
});

module.exports = getparameterSpec;
