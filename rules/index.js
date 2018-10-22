let rules = [];
const fileRule = require('./file-rule.js')
const extractCssRule = require('./extract-css-rule.js');
rules.push(fileRule, extractCssRule);

module.exports = rules;
