#!/usr/bin/env node
const { program } = require('commander');
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-V, --version', 'output the version number')
  .option('-f, --format [type] ', 'Output format')
  .arguments('<filepath1> <filepath2>');
// .parse(process.agrv);
program.parse();
