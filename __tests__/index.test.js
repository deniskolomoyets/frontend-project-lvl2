import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';

import genDiff from '../src/index.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Difference of two flat json-file', () => {
  const expectedResult = readFixture('expected_result');
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toBe(expectedResult);
});

test('Difference of two flat yml-file', () => {
  const expectedResult = readFixture('expected_result');
  const result = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  expect(result).toBe(expectedResult);
});
