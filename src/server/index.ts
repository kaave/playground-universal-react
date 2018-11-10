import 'tslib';
// import * as Dotenv from 'dotenv';

import { runHttp } from './http';
import { runWS } from './websocket';

// Dotenv.load();

runHttp();
runWS();
