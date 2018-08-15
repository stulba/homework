const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configMode = env => require(`./build-scripts/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: 'production' }) =>
  webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader']
          }
        ]
      },
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
    configMode(mode)
  );
