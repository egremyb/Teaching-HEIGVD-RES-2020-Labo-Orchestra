import * as dgram       from 'dgram';
import * as net         from 'net';
// @ts-ignore
import * as moment      from 'moment';
import * as protocol    from './protocol.js';

export class Auditor {

    udpSocket: dgram.Socket;
    tcpSocket: net.Server;
    musicians: Map<string, { "instrument":       string,
                             "activeSince":      string,
                             "lastTransmission": string }>;

    constructor(udpPort: number, tcpPort: number, ip: string) {

        let thisAuditor = this;

        this.udpSocket = dgram.createSocket('udp4');
        this.tcpSocket = net.createServer();
        this.musicians = new Map();

        this.udpSocket.on('message', function (msg, rinfo) {
            console.log('Received msg \'' + msg + '\'');
            thisAuditor.listenMusicOfAMusician(thisAuditor, msg);
        });
        this.udpSocket.addMembership(ip);
        this.udpSocket.bind(udpPort);

        this.tcpSocket.on('connection', function (socket: net.Socket) {
            console.log('Received connection');
            thisAuditor.connectOutsiderToAuditor(thisAuditor);
        });
        this.tcpSocket.listen(tcpPort);

        console.log("A new auditor is now listening for some good vibes!");
    }

    listenMusicOfAMusician(auditor: Auditor, msg: Buffer) {
        const music = JSON.parse(msg.toString());

        if (auditor.musicians.has(music.uuid)) {
            auditor.musicians.get(music.uuid).lastTransmission = moment().format();
        } else {
            const timestamp = moment().format();
            auditor.musicians.set(music.uuid, {
                "instrument":       protocol.soundsToInstruments.get(music.sound),
                "activeSince":      timestamp,
                "lastTransmission": timestamp});
            console.log("New musician on board! uuid=\'" + music.uuid + "\'");
        }

    }

    connectOutsiderToAuditor(auditor: Auditor) {
        let json = [];

        auditor.musicians.forEach(((value, key) => {

            let aliveTime = moment().subtract(protocol.ALIVE_TIME, 's').diff(value.lastTransmission);

            if (aliveTime <= 0) {
                json.push({
                    "uuid":        key,
                    "instrument":  value.instrument,
                    "activeSince": value.activeSince
                });
            } else {
                auditor.musicians.delete(key);
                console.log("One of the musician is inactive (╯°□°）╯︵ ┻━┻ [uuid=\'" + key + "\']");
            }
        }));
    }
}
