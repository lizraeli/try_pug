const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin(["src/"], { ignore: ["*.js", "*.ts"] })
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  node: {
    fs: "empty"
  },
  devtool: "source-map"
};
