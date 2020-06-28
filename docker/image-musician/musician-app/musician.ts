import { v4 as uuidv4 } from 'uuid';
import { Socket } from "dgram";
import * as dgram from 'dgram';
import * as protocol from './protocol.js';

export class Musician {

    instrument: string;
    uuid:       string;
    sound:      string;
    socket:     Socket;

    constructor(instrument: string) {

        if (!protocol.instrumentsToSounds.has(instrument)) {
            throw new Error('Give this mad musician an instrument!');
        }

        this.instrument = instrument;
        this.uuid       = uuidv4();
        this.sound      = protocol.instrumentsToSounds.get(instrument);
        this.socket     = dgram.createSocket('udp4');

        console.log('A new musician playing ' + this.instrument + ' is born! uuid=\'' + this.uuid + '\'');
    }

    playSound(port: number, ip: string) {
        this.socket.send(JSON.stringify({
            "uuid"  : this.uuid,
            "sound" : this.sound
        }), 0, this.sound.length, port, ip);
        console.log('This musician is making some noise : ' + this.sound + ' ♪ ♪ ♫');
    }

    concerto(port: number, ip: string, interval: number) {
        console.log('This beast of a musician is starting a concerto!');
        setInterval(() => this.playSound(port, ip), interval);
    }
}
