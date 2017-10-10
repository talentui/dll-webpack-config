const path = require("path");
const cwd = process.cwd();
let webpackConfig = require('../webpack.config.js')

describe("配置正确初始化",()=>{
  let config = webpackConfig({
    root: path.resolve(__dirname),
    venders: [],
    dllList:[]
  })
  it('config参数是一个对象',()=>{
    expect(typeof config).toBe('object');
  })
  it('entry是一个对象，并且其key中不能有减号',()=>{
    expect(typeof config.entry).toBe('object');
    expect(Object.keys(config.entry)[0].indexOf('-')).toBe(-1)
  })
})