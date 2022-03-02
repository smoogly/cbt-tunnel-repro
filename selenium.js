const webdriver = require('selenium-webdriver');
const credentials = require('./cbtCredentials');
const getLocalIP = require("./localIp");

const remoteHub = 'https://hub-cloud.crossbrowsertesting.com:443/wd/hub';

const isHeadless = process.argv[2] === "headless";
const capabilities = isHeadless ? {
        'name': 'Headless tunnel issue repro — failed on ubuntu',
        'build': 'Headless tunnel issue repro',
        'browserName': 'Chrome',
        'version': '89',
        'platform': 'Headless',
        'screenResolution': '1360x768',
        'record_video': 'true',
        'record_network': 'true'
    }
    : {
        'name': 'Headless tunnel issue repro — successful on win',
        'build': 'Headless tunnel issue repro',
        'browserName': 'Chrome',
        'version': '89',
        'platform': 'Windows 10',
        'screenResolution': '1366x768',
        'record_video': 'true',
        'record_network': 'true'
    };

capabilities.username = credentials.login;
capabilities.password = credentials.token;

(async () => {
    const driver = new webdriver.Builder()
        .usingServer(remoteHub)
        .withCapabilities(capabilities)
        .build();

    console.log("Obtaining session");
    const session = await driver.getSession();
    console.log('See your test run at: https://app.crossbrowsertesting.com/selenium/' + session.id_)

    const url = `http://${ getLocalIP() }:8000`;
    console.log("Connecting to local url:", url);

    const start = Date.now();
    const connectionLogInterval = setInterval(() => console.log(`Still trying to connect to ${url} for ${Math.round((Date.now() - start) / 1000)} seconds`), 1000);

    await driver.get(url);
    clearInterval(connectionLogInterval);
    const failed = Date.now() - start >= 100000; // If duration is over 100 seconds at this point, the connection has timed out.

    console.log("Quitting");
    await driver.quit()

    if (failed) {
        throw new Error("Failed to connect");
    } else {
        console.log("Done");
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
