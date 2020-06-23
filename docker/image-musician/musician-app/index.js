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
console.log(uuid)
