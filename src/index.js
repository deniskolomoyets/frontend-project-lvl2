import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';

// const filepath1 = '__fixtures__/file1.json';
// const filepath2 = '__fixtures__/file2.json';

// const func = (path1, path2) => {
//   const data1 = fs.readFileSync(path1, 'utf8');
//   const data2 = fs.readFileSync(path2, 'utf8');

//   const obj1 = JSON.parse(data1);
//   const obj2 = JSON.parse(data2);
const readFile = (file) => fs.readFileSync(path.resolve(file), 'utf8');

export default (filepath1, filepath2) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const obj1 = parse(readFile(filepath1), extension1);
  const obj2 = parse(readFile(filepath2), extension2);

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  // const keys = Object.keys({ ...obj1, ...obj2}).sort();

  const isNewKey = (key) => !_.has(obj1, key) && _.has(obj2, key);
  const isDeletedKey = (key) => _.has(obj1, key) && !_.has(obj2, key);
  const isKey = (key) => _.has(obj1, key) && _.has(obj2, key);
  const isMatch = (key) => obj1[key] === obj2[key];

  const result = keys.reduce((acc, key) => {
    let res = '';
    if (isNewKey(key, obj1, obj2)) {
      res = `${acc} + ${key}: ${obj2[key]}\n`;
    }
    if (isDeletedKey(key, obj1, obj2)) {
      res = `${acc} - ${key}: ${obj1[key]}\n`;
    }
    if (isKey(key, obj1, obj2) && isMatch(key, obj1, obj2)) {
      res = `${acc}   ${key}: ${obj1[key]}\n`;
    }
    if (isKey(key, obj1, obj2) && !isMatch(key, obj1, obj2)) {
      res = `${acc} - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}\n`;
    }
    return res;
  }, '');

  return `{\n${result}}`;
};
// console.log(genDiff('../__fixtures__/file1.yml', '../__fixtures__/file2.yml'));
