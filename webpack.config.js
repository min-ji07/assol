const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    publicPath: "/",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack-react-start-kit",
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      ROOT_DIR: JSON.stringify("/")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("dev")
    })
  ],
  devtool: "inline-source-map",
  devServer: {
    //contentBase: path.join(__dirname, "build"),
    contentBase: ["./src", "./public"],
    compress: true,
    open: true,
    noInfo: true,
    port: 3000,
    hot: true,
    historyApiFallback:true,
    after: function(app, server) {
      app.listen(3000, function() {
        console.log("Webpack dev server is listening on port 3000");
      });
    }
  },
  optimization: {
    minimize: false,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            unused: true
          },
          mangle: false,
          beautify: true,
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
