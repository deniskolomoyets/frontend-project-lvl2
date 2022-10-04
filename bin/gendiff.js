#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-v, --version', 'output the version number')
  .option('-f, --format [type] ', 'Output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(puk(filepath1, filepath2));
  });
// .parse(process.agrv);
program.parse();
