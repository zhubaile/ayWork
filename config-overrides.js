// const rewireLess = require('react-app-rewire-less');
const { injectBabelPlugin, paths } = require('react-app-rewired');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
   
    // 关于webpack的相关配置
    // const entrys = {index: "./src/apps/index.js",};
    // config.entry = entrys;
    // 设置别名路径
    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': paths.appSrc, // 在使用中有些 Eslint 规则会报错, 禁用这部分代码的 Eslint 检测即可
      '@ajax':path.join(__dirname,'./src/assets/common/axios.js'),
      '@router':path.join(__dirname,'./src/apps/routerCon')
    };
    return config;
  };