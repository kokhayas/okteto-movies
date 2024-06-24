const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const srcPath = path.join(__dirname, 'src');

module.exports = (_, options) => {
  const isDevelopment = options.mode === 'development';

  return {
    context: srcPath,
    mode: 'development',
    target: 'web',
    entry: ['./index.jsx'],
    output: {
      filename: 'app.[contenthash].js',
      path: path.join(__dirname, '/dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
      modules: [
        path.resolve(path.join(__dirname, '/node_modules')),
        path.resolve(srcPath)
      ]
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/i,
        include: srcPath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            }
          }
        ]
      }, {
        test: /\.css$/i,
        include: srcPath,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: path.join(srcPath, 'assets/images/favicon.png')
      }),
      isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    devServer: {
      port: 80,
      host: '0.0.0.0',
      hot: true,
      client: {
        webSocketURL: {
          port: 443,
        },
      },
      allowedHosts: 'all',
      proxy: [
        {
          context: ['/api'],
          target: 'http://movies-api:8080',
        },
      ],

    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    }
  };
}
