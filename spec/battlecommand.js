const s = require('@json-spec/core');
const uidSpec = require('./uid');
const pidSpec = require('./pid');
const attackmagic = JSON.parse(fse.readFileSync('AttackMagic.json', 'utf8'));
const singlecuremagic = JSON.parse(fse.readFileSync('SingleCureMagic.json', 'utf8'));
const rangecuremagic = JSON.parse(fse.readFileSync('AttackMagic.json', 'utf8'));

const battlecommandSpec = s.object({
    required: {
        uid : uidSpec,
        pid : pidSpec,
        command : i => {
            for (var j = 0; j < attackmagic.magicdatabook.length; j++) {
                if (attackmagic.magicdatabook[j].tag == i) return true;
            }
            for (var j = 0; j < singlecuremagic.magicdatabook.length; j++) {
                if (attackmagic.magicdatabook[j].tag == i) return true;
            }
            for (var j = 0; j < rangecuremagic.magicdatabook.length; j++) {
                if (attackmagic.magicdatabook[j].tag == i) return true;
            }
            return "amnormal" === i || "amguard" === i;
        }
    }
});

module.exports = battlecommandSpec;
