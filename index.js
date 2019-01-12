const express = require('express');
const randomstring = require('crypto-random-string');
const RoomInfo = require("./roominfo.js");
const bodyParser = require('body-parser');
const roomTypeValid = require('./roomTypeValidator.js');
const app = express();

/** @type {Map<RoomInfo>} */
const roomlist = new Map();

const fse = require('fs/promises');
const jsonParser = bodyParser.json();

const main = async () => {
	const settinginfo = JSON.parse(await fse.readFile('settings.json', 'utf8'));
	app.post('/start', jsonParser, (req, res) => {
		if (!req.body || !roomTypeValid(req.body.gamemode)) return res.sendStatus(400);
		let UID = randomstring(settinginfo.data.uidlength);
		while (roomlist.has(UID)) UID = randomstring(settinginfo.data.uidlength);
		roomlist.set(UID, new RoomInfo(req.body.gamemode));
		setTimeout(() =>{
			if (!roomlist.get(UID).seedIsValid()) roomlist.delete(UID);
		}, settinginfo.data.timeout * 1000);
		res.send(JSON.stringify({ "uid" : UID }));
	});
	app.use(bodyParser.json( { type: 'application/*+json'}));
	app.listen(3000);
};

main();
