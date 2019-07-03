const webpack = require("webpack");
const definePlugin = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  }),
];
var nodeExternals = require('webpack-node-externals');



module.exports = {
  mode: 'production',
  plugins: definePlugin,//commonjs umd
  output: {
    libraryTarget: "umd"
  },
  //为了不把nodejs内置模块打包进输出文件中，例如： fs net模块等；
  target: "node",
  //为了不把node_modeuls目录下的第三方模块打包进输出文件中
  externals: [nodeExternals()],
  optimization: {
    usedExports:true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },  //支持less
          },
        ],
      }
    ]
  }
};
