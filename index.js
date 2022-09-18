import _ from 'lodash';
import fs from 'fs';

const path1 = 'file1.json';
const path2 = 'file2.json';

const func = (path1, path2) => {
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const isNewKey = (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key);
  const isDeletedKey = (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key);
  const isKey = (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key);
  const isMatch = (key, obj1, obj2) => obj1[key] === obj2[key];

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

console.log(func(path1, path2));
