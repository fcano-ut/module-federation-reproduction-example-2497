const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');
const packageJson = require('./package.json');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
    // enable cors
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      library: { type: 'var', name: 'app2' },
      filename: 'remoteEntry.js',
      runtimePlugins: [
        // uses global plugin injected by app1
      ],
      exposes: {
        './Button': './src/Button',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true }, 'lodash': { requiredVersion: packageJson.dependencies.lodash } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
