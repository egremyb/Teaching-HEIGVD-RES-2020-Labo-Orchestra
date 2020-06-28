import { Musician } from './musician.js';
import * as protocol from './protocol.js';

if (process.argv.length != 3) {
    console.log('Give this mad musician an instrument!');
    process.exit(1);
} else {
    let musician = new Musician(process.argv[2]);
    musician.concerto(protocol.UDP_PORT, protocol.MUTLICAST_GROUP, 500);
}

