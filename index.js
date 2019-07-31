const express = require('express');
const randomstring = require('crypto-random-string');
const RoomInfo = require("./roominfo.js");
const bodyParser = require('body-parser');
const startSpec = require('./spec/start');
const setseedSpec = require('./spec/setseed');
const enterroomSpec = require('./spec/enterroom');
const characterdataSpec = require('./spec/characterdata');
const getparameterSpec = require('./spec/getparameter');
const setBattleCommandSpec = require('./spec/setbattlecommand');
const s = require('@json-spec/core');
const app = express();

/** @type {Map<string,RoomInfo>} */
const roomlist = new Map();

const fse = require('fs/promises');
const jsonParser = bodyParser.json();

const main = async () => {
	const settinginfo = JSON.parse(await fse.readFile('setting.json', 'utf8').catch(er => {
		console.error("Fail to open setting.json", er);
		process.exit(1);
	}));
	app.post('/start', jsonParser, (req, res) => {
		if (!req.body || !s.isValid(startSpec, req.body)) return res.sendStatus(400);
		let UID = randomstring(settinginfo.data.uidlength);
		while (roomlist.has(UID)) UID = randomstring(settinginfo.data.uidlength);
		roomlist.set(UID, new RoomInfo(req.body.gamemode));
		roomlist.get(UID).setTimer(
			setTimeout(() => {
				if (!roomlist.get(UID).seedIsValid()) roomlist.delete(UID);
			}, settinginfo.data.timeout * 1000)
		);
		res.send(JSON.stringify({ "uid" : UID, "pid" : roomlist.get(UID).addPlayer(settinginfo.data.pidlength) }));
	});
	app.post('/setseed', jsonParser, (req, res) => {
		if (!req.body || !s.isValid(setseedSpec, req.body)) return res.sendStatus(400);
		if (!roomlist.has(req.body.uid)) return res.sendStatus(404);
		roomlist.get(req.body.uid).setSeed(req.body.seed);
		return res.sendStatus(200);
	});
	app.post('/enterroom', jsonParser, (req, res) => {
		if (!req.body || !s.isValid(enterroomSpec, req.body)) return res.sendStatus(400);
		if (!roomlist.has(req.body.uid)) return res.sendStatus(404);
		const pid = roomlist.get(req.body.uid).addPlayer(settinginfo.data.pidlength);
		if (pid === null) return res.sendStatus(403);
		res.send(JSON.stringify({ "seed" : roomlist.get(req.body.uid).getSeed(), "pid" : pid }));
	});
	app.get('/partnerexist', jsonParser, (req, res) => {
		// enterroomSpecと要求が同じなので流用
		if (!req.body || !s.isValid(enterroomSpec, req.body)) return res.sendStatus(400);
		if (!roomlist.has(req.body.uid) || !roomlist.get(req.body.uid).twoPlayerExist()) return res.sendStatus(404);
		return res.sendStatus(200);
	});
	app.post('/setcharacter', jsonParser, (req, res) => {
		if (!req.body || !s.isValid(characterdataSpec, req.body)) return res.sendStatus(400);
		if (!roomlist.has(req.body.uid) || !roomlist.get(req.body.uid).setCharacterConfig(req.body)) return res.sendStatus(404);
		if (!roomlist.get(req.body.uid).isRoomPlayer(req.body.pid)) return res.sendStatus(403);
		return res.sendStatus(200);
	});
	app.get('/getpartnerparam', jsonParser, (req, res) =>{
		if (!req.body || !s.isValid(getparameterSpec, req.body)) return res.sendStatus(400);
		if (!roomlist.has(req.body.uid)) return res.sendStatus(404);
		if (!roomlist.get(req.body.uid).isRoomPlayer(req.body.pid)) return res.sendStatus(403);
		const param = roomlist.get(req.body.uid).getCharacterConfig(req.body.pid);
		if (param === null) return res.sendStatus(403);
		res.send(param);
	});
	app.post('/setbattlecommand', jsonParser, (req, res) => {
		if (!req.body || !s.isValid(setBattleCommandSpec, req.body)) return res.sendStatus(400);
		if (!roomlist.has(req.body.uid)) return res.sendStatus(404);
		if (!roomlist.get(req.body.uid).isRoomPlayer(req.body.pid)) return res.sendStatus(403);
		roomlist.get(req.body.uid).setBattleCommand(req.body);
		return res.sendStatus(200);
	});
	app.use(bodyParser.json( { type: 'application/*+json'}));
	app.listen(settinginfo.port);
};

main().catch(er => {
	console.error(er);
	process.exit(1);
});
