/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports  */
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// Se quiser excluir dependências do node_modules do bundle, instale:
// npm i -D webpack-node-externals
const nodeExternals = require('webpack-node-externals');

module.exports = (options) => {
  return {
    entry: './src/main.ts',
    target: 'node', // Importante para apps Node
    externals: [
      nodeExternals(), // Para não empacotar o node_modules
    ],
    mode: 'production',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'), // Pasta de saída
      libraryTarget: 'commonjs2', // Especialmente útil p/ serverless
    },
    optimization: {
      minimize: true, // Minifica somente em produção
    },
    plugins: [
      // new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }), // Exemplo
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            '@nestjs/microservices/microservices-module',
            '@nestjs/websockets/socket-module',
            'class-transformer/storage',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist', 'public'),
          },
          {
            from: path.resolve(__dirname, 'node_modules', 'swagger-ui-dist'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
    ],
  };
};
