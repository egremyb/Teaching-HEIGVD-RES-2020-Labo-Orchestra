import { v4 as uuidv4 } from 'uuid';
import * as dgram from 'dgram';
import * as protocol from './protocol.js';
export class Musician {
    constructor(instrument) {
        if (!protocol.instrumentsToSounds.has(instrument)) {
            throw new Error('Give this mad musician an instrument!');
        }
        this.instrument = instrument;
        this.uuid = uuidv4();
        this.sound = protocol.instrumentsToSounds.get(instrument);
        this.socket = dgram.createSocket('udp4');
        console.log('A new musician playing ' + this.instrument + ' is born! uuid=\'' + this.uuid + '\'');
    }
    playSound(port, ip) {
        this.socket.send(JSON.stringify({
            "uuid": this.uuid,
            "sound": this.sound
        }), 0, this.sound.length, port, ip);
        console.log('This musician is making some noise : ' + this.sound + ' ♪ ♫');
    }
    concerto(port, ip, interval) {
        console.log('This beast of a musician is starting a concerto!');
        setInterval(() => this.playSound(port, ip), interval);
    }
}
