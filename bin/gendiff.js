import { Command } from 'commander/esm.mjs';
import { genDiff } from '../src/index.js';
import path from 'path';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>',  'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        console.log(genDiff(filepath1, filepath2));
      });
program.parse();
