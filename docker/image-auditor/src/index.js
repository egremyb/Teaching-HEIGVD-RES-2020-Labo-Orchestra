const MUTLICAST_GROUP = "239.0.0.100";
const TCP_PORT        = 2205;
const UDP_PORT        = 2206;
const ALIVE_TIME      = 5;

const soundsToInstruments = new Map([
    ["ti-ta-ti",  "piano"],
    ["pouet",     "trumpet"],
    ["trulu",     "flute"],
    ["gzi-gzi",   "violin"],
    ["boum-boum", "drum"]
]);

const dgram  = require('dgram');
const net    = require('net');
const moment = require('moment');
const ip     = require('ip');

const musicians = new Map();

// -----------------------------
// UDP CONFIG
// -----------------------------
const udpSocket = dgram.createSocket('udp4');

// Add membership once the UDP Socket is started.
udpSocket.on("listening", () => {
    udpSocket.addMembership(MUTLICAST_GROUP);
});

// Musician sound reception: try to add the musician to the map.
udpSocket.on('message', function (msg, rinfo) {
    const music = JSON.parse(msg);

    if (musicians.has(music.uuid)) {
        musicians.get(music.uuid).lastTransmission = moment().format();
    } else {
        const timestamp = moment().format();
        musicians.set(music.uuid, {
            "instrument":       soundsToInstruments.get(music.sound),
            "activeSince":      timestamp,
            "lastTransmission": timestamp});
        console.log("New musician on board! uuid=\'" + music.uuid + "\'");
    }
});

// -----------------------------
// TCP CONFIG
// -----------------------------
const tcpSocket = net.createServer();

tcpSocket.on("message", (msg, rinfo) => {
    let jsonActivesMusicians = [];

    auditor.musicians.forEach(((value, key) => {

        if (moment().subtract(ALIVE_TIME, 's').diff(value.lastTransmission) <= 0) {
            jsonActivesMusicians.push({
                "uuid":        key,
                "instrument":  value.instrument,
                "activeSince": value.activeSince
            });
        } else {
            auditor.musicians.delete(key);
            console.log("One of the musician is inactive (╯°□°）╯︵ ┻━┻ [uuid=\'" + key + "\']");
        }
    }));
});

// -----------------------------
// UDP & TCP START
// -----------------------------
udpSocket.bind(UDP_PORT);
tcpSocket.listen(TCP_PORT, ip.address());
