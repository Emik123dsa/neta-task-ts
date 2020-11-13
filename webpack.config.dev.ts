import { __WEBPACK_APPLICATION__ } from "./webpack.config";

import * as webpack from "webpack";

import { CleanWebpackPlugin } from "clean-webpack-plugin";

import * as path from "path";
import nodeExternals from "webpack-node-externals";
import CircularDependencyPlugin from "circular-dependency-plugin";

const plugins: any[] = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: "main.js.map",
    exclude: ["bundle.js"],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: false,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.NoEmitOnErrorsPlugin(),
];

export default __WEBPACK_APPLICATION__({
  mode: "development",
  watch: true,
  entry: ["babel-polyfill", "./src/index.ts"],
  output: {
    filename: "[name].dev.js",
    chunkFilename: "[name].dev.js",
  },
  plugins,
  target: "node",
  devtool: "eval-source-map",
  performance: {
    hints: false,
  },
}) as ReturnType<typeof __WEBPACK_APPLICATION__>;
