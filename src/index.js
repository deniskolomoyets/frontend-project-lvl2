import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatStylish from './stylish.js';

const readFile = (file) => fs.readFileSync(path.resolve(file), 'utf8');

const getObject = (filepath) => {
  const data = readFile(filepath);
  const format = path.extname(filepath);
  const object = parse(data, format);
  return object;
};

const buildTree = (filepath1, filepath2) => {
  // const extension1 = path.extname(filepath1);
  // const extension2 = path.extname(filepath2);
  // const obj1 = parse(readFile(filepath1), extension1);
  // const obj2 = parse(readFile(filepath2), extension2);
  const obj1 = Object.keys(filepath1);
  const obj2 = Object.keys(filepath2);
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  // const keys = Object.keys({ ...obj1, ...obj2}).sort();

  const isNewKey = (key) => !_.has(obj1, key) && _.has(obj2, key);
  const isDeletedKey = (key) => _.has(obj1, key) && !_.has(obj2, key);
  const isKey = (key) => _.has(obj1, key) && _.has(obj2, key);
  const isMatch = (key) => obj1[key] === obj2[key];

  return keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) { // nested
      acc.push({ key, type: 'nested', children: buildTree(obj1[key], obj2[key]) });
      return acc;
    }

    if (isNewKey(key, obj1, obj2)) {
      acc.push({ key, type: 'added', value: obj2[key] }); // add
      return acc;
    }
    if (isDeletedKey(key, obj1, obj2)) {
      acc.push({ key, type: 'deleted', value: obj1[key] }); // deleted
      return acc;
    }
    if (isKey(key, obj1, obj2) && isMatch(key, obj1, obj2)) { // unchanged
      acc.push({ key, type: 'unchanged', value: obj1[key] });
      return acc;
    }
    if (isKey(key, obj1, obj2) && !isMatch(key, obj1, obj2)) { // changed
      acc.push({
        key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      });
      return acc;
    }
    return acc;
  }, []);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  const tree = buildTree(object1, object2);

  switch (format) {
    case 'stylish':
      return formatStylish(tree);
    default:
      throw new Error(`format ${format} - unsupported`);
  }
};
// console.log(genDiff('../__fixtures__/file1.yml', '../__fixtures__/file2.yml'));
export default genDiff;
