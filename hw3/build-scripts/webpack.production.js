const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => ({
  output: {
    filename: 'assets/scripts/[name]-[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({}), new OptimizeCssAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              fallback: 'file-loader',
              outputPath: 'assets/images',
              name: '[sha512:hash:base64:7].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css'
    })
  ]
});
