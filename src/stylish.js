import _ from 'lodash';

const formatStylish = (tree, spacesCount = 4, replacer = ' ') => {
  const iter = (node, depth) => {
    if (typeof node !== 'object') {
      return node.toString();
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const entries = Object.entries(node);

    const lines = entries.map(([entriesKey, entriesValue]) => {
      const { type } = entriesValue;
      switch (type) {
        case 'added': {
          const { key, value } = entriesValue;
          return `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`;
        }
        case 'deleted': {
          const { key, value } = entriesValue;
          return `${currentIndent}- ${key}: ${iter(value, depth + 1)}`;
        }
        case 'changed': {
          const { key, valueBefore, valueAfter } = entriesValue;
          return `${currentIndent}- ${key}: ${iter(valueBefore, depth + 1)}\n${currentIndent}+ ${key}: ${iter(valueAfter, depth + 1)}`;
        }
        case 'unchanged': {
          const { key, value } = entriesValue;
          return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
        }
        case 'nested': {
          const { key, children } = entriesValue;
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        }
        default:
          return `${currentIndent}  ${entriesKey}: ${iter(entriesValue, depth + 1)}`;
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};
export default formatStylish;
