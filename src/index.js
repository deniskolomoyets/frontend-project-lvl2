import path from 'path';
import { readFileSync} from 'fs';
import _ from 'lodash';


const fileParse = (file) => JSON.parse(readFileSync(path.resolve(file), 'utf8'));

export const genDiff = (filepath1, filepath2) => {
  const json1 = fileParse(filepath1);
  const json2 = fileParse(filepath2);

  const keysToCompare = Object.keys({ ...json1, ...json2 }).sort();

  let result = '{\n';
  
  keysToCompare.forEach((key) => {
    const key1 = json1[key];
    const key2 = json2[key];

    if (key1 === key2) {
      result += `    ${key}: ${key1}\n`;
      return;
    }

    if (_.has(json1, key)) {
      result += `  - ${key}: ${key1}\n`;
    }

    if (_.has(json2, key)) {
      result += `  + ${key}: ${key2}\n`;
    }
  });

  result += '}';

  return result;
};

