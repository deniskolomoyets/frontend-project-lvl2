import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const readFile = (file) => readFileSync(path.resolve(file), 'utf8');

const genDiff = (file1, file2) => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);

  const parsedFile1 = parse(readFile(file1), extension1);
  const parsedFile2 = parse(readFile(file2), extension2);
  const keysToCompare = Object.keys({ ...parsedFile1, ...parsedFile2 }).sort();

  let result = '{\n';

  keysToCompare.forEach((key) => {
    const key1 = parsedFile1[key];
    const key2 = parsedFile2[key];

    if (key1 === key2) {
      result += `    ${key}: ${key1}\n`;
      return;
    }

    if (_.has(parsedFile1, key)) {
      result += `  - ${key}: ${key1}\n`;
    }

    if (_.has(parsedFile2, key)) {
      result += `  + ${key}: ${key2}\n`;
    }
  });

  result += '}';

  return result;
};

export default genDiff;
