const s = require('@json-spec/core');
const uidSpec = require('./uid');
const fse = require('fs/promises');
const partnerid = JSON.parse(await fse.readFile('btpartner.json', 'utf8').catch(er => {
    console.error("Fail to open setting.json", er);
    process.exit(1);
}));
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