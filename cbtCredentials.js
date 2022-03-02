const { raw } = require('lazy-universal-dotenv').getEnvironment();

const pick = (key) => {
  if (raw[key]) { return raw[key]; }
  throw new Error(`'${key}' is missing in the env. Please add it to your '.env.local' file at the root of the project`);
};

module.exports = {
  login: pick('CROSSBROWSERTESTING_LOGIN'),
  token: pick('CROSSBROWSERTESTING_TOKEN')
};
