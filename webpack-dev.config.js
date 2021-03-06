var commonConfig = require('./webpack-common.config.js');

var devLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - with the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'],
  }
]

module.exports = {
  entry: [
    // setup the hot mobule loading
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    // our entry file
    './app/main.jsx'
  ],
  output: {
    path: './build',
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  devtool: 'eval',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: [
      {
        ws: true,
        path:'*',
        target:'ws://localhost:5000'
      },
      {
        path: '/api/*',
        target:'http://localhost:5000/'
      }
    ],

    historyApiFallback: true
  },
  module: {
    loaders: commonConfig.loaders.concat(devLoaders)
  },
  plugins: [
    commonConfig.indexPagePlugin
  ],
};
