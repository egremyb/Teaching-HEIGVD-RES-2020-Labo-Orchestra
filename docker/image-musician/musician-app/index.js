const dgram   = require('dgram');
const socket  = dgram.createSocket('udp4');
const net     = require('net');
const { v4: uuidv4 } = require('uuid');

const instruments = new Map();
instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");

const uuid = uuidv4();
console.log(uuid);

console.log('Sound : ' + getInstrument());

function getSound() {

    if (process.argv.length != 3) {
        console.log('Give this mad musician an instrument!');
        process.exit(1);
    }

    sound = instruments.get(process.argv[2]);

    if (sound == undefined) {
        console.log('This musician doesn\'t know how to play : ' + process.argv[2]);
        process.exit(1);
    }

    return sound;
}
