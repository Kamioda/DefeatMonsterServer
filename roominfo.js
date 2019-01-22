"use scrict";
const s = require('@json-spec/core');
const seedSpec = require('./spec/seed');

class RoomInfo {
    constructor(gamemode){
        this.seed_ = [];
        this.gamemode_ = gamemode;
        this.timer_ = null;
    }
    setSeed(seedData) {
        this.seed_ = seedData;
        clearTimeout(this.timer_);
        this.timer_ = null;
    }
    seedIsValid(){
        return s.IsValid(seedSpec, this.seed_);
    }
    getSeed() {
        return this.seed_;
    }
    setTimer(timer) {
        if (this.timer_ != null) clearTimeout(this.timer_);
        this.timer_ = timer;
    }
    }
}
module.exports = RoomInfo;
