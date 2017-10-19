let rules = [];
const fileRule = require('./file-rule.js')
const extractCssRule = require('./extract-css-rule.js');
const extractSassRule = require('./extract-sass-rule');
rules.push(fileRule, extractCssRule, extractSassRule);

export default rules;
