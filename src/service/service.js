'use strict';

const {Cli} = require(`./cli`);

const DEFAULT_COMMAND = `--version`;
const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, commandValue] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit();
}

Cli[userCommand].run(commandValue);
