const md = require('./parse/markdown/index'),
  parse = require('./parse/index');

module.exports = (str, type, option)=>{
  option = option || {};
  let result;
  let res;
  switch (type) {
  case 'markdown':
    res = md(str);
    res = res.replace(/>\s+</g, '><');
    // console.log('res', res);
    result = parse(res, option);
    break;
  case 'html':
    result = parse(str, option);
    break;
  default:
    throw new Error('Invalid type, only markdown and html are supported');
  }
  return result;
};
