const chalk = require("chalk");

// define chalk themes for better console logging
const success = chalk.green.bold;
const error = chalk.red.bold;
const warning = chalk.yellow.bold;

module.exports = { success, error, warning };
