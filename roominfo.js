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
    twoPlayerExist() {
        return this.player_.length === 2;
    }
}
module.exports = RoomInfo;
