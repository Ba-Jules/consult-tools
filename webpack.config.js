const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: isProduction ? '/new-collaborative-tools/' : '/',
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8083,
      hot: true,
      historyApiFallback: true, // Pour gérer les routes React
      open: true,
      allowedHosts: "all", // Autorise tous les hôtes (nécessaire pour Ngrok)
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        //favicon: './public/favicon.ico', // Si vous avez un favicon
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|mp4|svg|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    performance: {
      hints: false,
    },
    stats: {
      errorDetails: true,
    },
  };
};