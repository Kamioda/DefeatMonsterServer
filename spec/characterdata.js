const s = require('@json-spec/core');
const uidSpec = require('./uid');
const fse = require('fs/promises');
const partnerid = JSON.parse(fse.readFileSync('btpartner.json', 'utf8'));
const settinginfo = JSON.parse(fse.readFileSync('setting.json', 'utf8'));

String.prototype.bytes = () => {
    var length = 0;
    for (var i = 0; i < this.length; i++) {
      var c = this.charCodeAt(i);
      if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        length += 1;
      } else {
        length += 2;
      }
    }
    return length;
  };  
const characterdataSpec = s.object({
    required: {
        uid : uidSpec,
        pid : i => { return i.length === settinginfo.data.pidlength; },
        name : i => { return i.bytes() <= 10; },
        sex : i => { return i >= 0 && i <= 3; },
        style : i => { return i >= 0 && i <= 3; },
        partner : i => {
            for (var j = 0; j < partnerid.characterdatabook.length; j++){
                if (partnerid.characterdatabook[j].tag == i) return true;
            }
            return false;
        }
    }
});

module.exports = characterdataSpec;
