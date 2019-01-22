const s = require('@json-spec/core');
const roomTypeValid = require('./impl/roomTypeValidator.js');

const startSpec = s.object({
    required: {
        gamemode: s.spec(roomTypeValid)
    }
});

module.exports = startSpec;
