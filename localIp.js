const { networkInterfaces } = require('os');

module.exports = () => {
  const networks = networkInterfaces();
  const localNetwork = Object.keys(networks)
    .map((k) => networks[k])
    .reduce((all, one) => [...all, ...one])
    .find((network) => network.family === 'IPv4' && !network.internal && network.cidr !== null);
  if (!localNetwork) { throw new Error('Local network not found'); }

  return localNetwork.address;
};
