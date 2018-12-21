"use scrict";

class RoomInfo {
    constructor(gamemode){
        this.seed_ = "";
        this.gamemode_ = gamemode;
    }
    seedIsValid(){
        return 1250 === this.seed_.length;
    }
}
module.exports = RoomInfo;
