const MUTLICAST_GROUP = "239.0.0.100";
const UDP_PORT        = 2206;
const INTERVAL        = 666;

const instrumentsToSounds = new Map([
    ["piano", "ti-ta-ti"],
    ["trumpet", "pouet"],
    ["flute", "trulu"],
    ["violin", "gzi-gzi"],
    ["drum", "boum-boum"]
]);

const { v4: uuidv4 } = require('uuid');
const dgram          = require('dgram');

// -----------------------------
// CHECK ARGUMENT
// -----------------------------

if (process.argv.length != 3) {
    console.log('Give this mad musician an instrument!');
    process.exit(1);
}

const instrument = process.argv[2];

if (!instrumentsToSounds.has(instrument)) {
    console.log('You can play music with \'' + instrument + '\' ? I dunno');
    process.exit(1);
}

// -----------------------------
// PREPARE SOCKET TO SEND SOUND
// -----------------------------

const uuid   = uuidv4();
const sound  = instrumentsToSounds.get(instrument);
const socket = dgram.createSocket('udp4');

socket.on("listening", function() {
    console.log('This beast of a musician is starting a concerto!');
    setInterval(function() {
        const msgContent = JSON.stringify({
            "uuid"  : uuid,
            "sound" : sound,
        });
        socket.send(msgContent, 0, msgContent.length, UDP_PORT, MUTLICAST_GROUP);
        console.log('This musician is making some noise : ' + sound + ' ♪ ♪ ♫');

    }, INTERVAL);
});

// -----------------------------
// BIND & START SOCKET
// -----------------------------
socket.bind(UDP_PORT);
