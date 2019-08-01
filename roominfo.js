"use scrict";
const randomstring = require('crypto-random-string');
const s = require('@json-spec/core');
const seedSpec = require('./spec/seed');

class RoomInfo {
    constructor(gamemode){
        /** @type {number[]} */
        this.seed_ = [];
        this.gamemode_ = gamemode;
        /** @type {NodeJS.Timeout} */
        this.timer_ = null;
        /** @type {string[]} */
        this.player_ = [];
        /** @type {string[]} */
        this.characterconfig_ = [];
        /** @type {string[]} */
        this.battlecommand_ = [];
    }
    /**
     * Set seed and clear timer passed via setTimer
     * @param {number[]} seedData
     */
    setSeed(seedData) {
        this.seed_ = seedData;
        clearTimeout(this.timer_);
        this.timer_ = null;
    }
    /**
     * @returns {boolean}
     */
    seedIsValid(){
        return s.IsValid(seedSpec, this.seed_);
    }
    getSeed() {
        return this.seed_;
    }
    /**
     * @param {NodeJS.Timeout} timer result of setTimeout
     */
    setTimer(timer) {
        if (this.timer_ != null) clearTimeout(this.timer_);
        this.timer_ = timer;
    }
    /**
     * @param {number} pidLength length of pid from setting.json
     * @returns {string} new pid
     */
    addPlayer(pidLength) {
        switch (this.player_.length) {
            case 0:
                this.player_.push(randomstring(pidLength));
                return this.player_[0];
            case 1: {
                let pid = randomstring(pidLength);
                while (this.player_[0] === pid) pid = randomstring(pidLength);
                this.player_.push(pid);
                return pid;
            }
            default:
                return null;
        }
    }
    setCharacterConfig(characterConfig) {
        switch(this.characterconfig_.length){
            case 0:
                this.characterconfig_.push(characterConfig);
                return true;
            case 1: {
                const newCharacterConfig = JSON.parse(characterConfig);
                const existCharacterConfig = JSON.parse(this.characterconfig_[0]);
                if (newCharacterConfig.partner === existCharacterConfig.partner) {
                    this.characterconfig_.push(characterConfig);
                    return true;
                }
                return false;
            }
            default:
                return false;
        }
    }
    getCharacterConfig(pid) {
        if (this.characterconfig_.length === 2) {
            const firstCharacterConfig = JSON.parse(this.characterconfig_[0]);
            const secondCharacterConfig = JSON.parse(this.characterconfig_[1]);
            if (firstCharacterConfig.pid === pid) return this.characterconfig_[1];
            else if (secondCharacterConfig.pid === pid) return this.characterconfig_[0];
        }
        return null;
    }
    twoPlayerExist() {
        return this.player_.length === 2;
    }
    isRoomPlayer(pid) {
        return pid === this.player_[0] || pid === this.player_[1];
    }
    setBattleCommand(commandjson) {
        this.battlecommand_.push(commandjson);
    }
    getBattleCommand(pid) {
        if (this.battlecommand_.length === 2) {
            const firstBattleCommand = JSON.parse(this.battlecommand_[0]);
            const secondBattleCommand = JSON.parse(this.battlecommand_[1]);
            if (firstBattleCommand.pid === pid) return this.battlecommand_[1];
            else if (secondBattleCommand.pid === pid) return this.battlecommand_[0];
        }
        return null;
    }
    deleteRoomPlayer(pid) {
        if (this.player_[0] === pid) {
            delete this.player_[0];
            return true;
        }
        else if (this.player_[1] === pid) {
            delete this.player_[1];
            return true;
        }
    }
}
module.exports = RoomInfo;
