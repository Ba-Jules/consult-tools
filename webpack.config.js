const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  cache: {
    type: 'filesystem', // Utilisation d'un cache système pour éviter la persistance de bugs de cache
    buildDependencies: {
      config: [__filename], // Recharge le cache si ce fichier change
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8083,
    hot: true, // Active le Hot Module Replacement (HMR)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        type: 'asset/resource', // Remplace file-loader pour une gestion plus moderne des fichiers
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};