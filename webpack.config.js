const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.jsx',
  devServer: {
    host: 'localhost',
    port: 5555,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /src\/.+(\.js$|\.jsx$)/,
        include: path.join(__dirname, '/src/'),
        loader: 'eslint-loader',
      },
    ],
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
};
