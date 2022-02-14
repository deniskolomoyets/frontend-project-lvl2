import { Command } from 'commander/esm.mjs';
import path from 'path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => (
    console.log(genDiff(path.resolve(process.cwd(), file1), path.resolve(process.cwd(), file2)))))
  .parse(process.agrv);
