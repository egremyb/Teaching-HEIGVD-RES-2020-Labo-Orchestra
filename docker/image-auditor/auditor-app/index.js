import { Auditor } from './auditor.js';
import * as protocol from './protocol.js';

let auditor = new Auditor(protocol.UDP_PORT, protocol.TCP_PORT, protocol.MUTLICAST_GROUP);
