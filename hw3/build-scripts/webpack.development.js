const webpack = require('webpack');

module.exports = () => ({
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              fallback: 'file-loader',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
