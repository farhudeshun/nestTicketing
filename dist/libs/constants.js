"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBIT_URI = exports.CACHE_TIMEOUT = void 0;
require("dotenv");
exports.CACHE_TIMEOUT = +process.env.CACHE_TIMEOUT || 120;
const RABBIT_URI = () => {
    const rabbitUri = process.env.RABBIT_URI || 'amqp://127.0.0.1:5672';
    const [credential, hosts] = rabbitUri.split('@');
    const hostList = hosts.split(',');
    return hostList.map((host, index) => {
        return `${credential}@${host}`;
    });
};
exports.RABBIT_URI = RABBIT_URI;
//# sourceMappingURL=constants.js.map