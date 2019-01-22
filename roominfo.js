"use scrict";
const s = require('@json-spec/core');
const seedSpec = require('./spec/seed');

class RoomInfo {
    constructor(gamemode){
        this.seed_ = [];
        this.gamemode_ = gamemode;
    }
    seedIsValid(){
        return s.IsValid(seedSpec, this.seed_);
    }
    }
}
module.exports = RoomInfo;
