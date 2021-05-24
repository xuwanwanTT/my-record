const {
  override,
  disableEsLint,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackPlugin,
} = require("customize-cra");
var ProgressBarPlugin = require("progress-bar-webpack-plugin");
// var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  webpack: override(
    disableEsLint(),
    // addWebpackPlugin(new HardSourceWebpackPlugin()), // 优化开发时的热更新
    addWebpackPlugin(new ProgressBarPlugin()),
    addDecoratorsLegacy(), // 使用装饰器语法
    addLessLoader({
      javascriptEnabled: true,
    })
  )
};
