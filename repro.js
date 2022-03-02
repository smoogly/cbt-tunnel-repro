const { cmd, work, detectLog, exec} = require("tasklauncher");
const launchTunnel = require("./tunnel/launch_tunnel");

const { platform } = require('os');
const platformName = platform();
if (platformName !== "linux" && platformName !== "darwin") {
    throw new Error(`This code is only suitable to run on linux or mac, got: ${platformName}`);
}

const serve = cmd(`serve -l 8000 ./static`, detectLog('Accepting connections'));
const successful = cmd("node selenium.js win");
const failed = cmd("node selenium.js headless", () => Promise.resolve());

const successfulRun = work(successful).after(serve, launchTunnel);
exec(work(failed).after(serve, launchTunnel, successfulRun));
