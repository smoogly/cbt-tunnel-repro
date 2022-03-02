const { cmd, work } = require("tasklauncher");
const { platform } = require('os');
const { login, token } = require('../cbtCredentials');
const { statSync } = require("fs");

const executable = () => {
    switch (platform()) {
        case 'darwin':
            return './tunnel/SBSecureTunnel_mac';

        case 'linux':
            return './tunnel/SBSecureTunnel_linux';

        default:
            throw new Error(`Platform '${platform()}' not supported by screenshooter`);
    }
};

const readyfilePath = './tunnel_ready';
const cleanReadyFile = cmd(`rm -f ${readyfilePath}`);

const launchTunnel = cmd(`${ executable() } --username ${ login } --authkey ${ token } --ready ${ readyfilePath } --quiet`, () => new Promise((res, rej) => {
    let i = 100;
    const interval = setInterval(() => {
        if (statSync(readyfilePath, { throwIfNoEntry: false })) {
            clearInterval(interval);
            res();
        } else if (--i < 0) {
            clearInterval(interval);
            rej(new Error('Failed to start the tunnel'));
        }
    }, 100);
}));

module.exports = () => work(launchTunnel).after(cleanReadyFile);
