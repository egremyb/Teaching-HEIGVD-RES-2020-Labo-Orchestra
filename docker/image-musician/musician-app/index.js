import { Musician } from './musician.js';

const MUTLICAST_GROUP = "239.0.0.100"
const PORT            = 2506

if (process.argv.length != 3) {
    console.log('Give this mad musician an instrument!');
    process.exit(1);
} else {
    let musician = new Musician(process.argv[2]);
    musician.concerto(PORT, MUTLICAST_GROUP, 500);
}

