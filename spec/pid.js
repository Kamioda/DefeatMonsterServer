const s = require('@json-spec/core');
const fs = require('fs');
const settinginfo = JSON.parse(fs.readFileSync('./setting.json', 'utf8'));

module.exports = s.spec(str => {
    return settinginfo.data.pidlength === str.length;
});
