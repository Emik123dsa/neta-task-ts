import { __WEBPACK_APPLICATION__ } from "./webpack.config";
import * as path from "path";

import * as webpack from "webpack";

import TerserWebpackPlugin from "terser-webpack-plugin";

export default __WEBPACK_APPLICATION__({
  mode: "production",
  entry: {
    index: ["./src/index.ts"],
  },
  output: {
    filename: "index.js",
    chunkFilename: "index.js",
  },
  plugins: [
    new TerserWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  target: "node",
  devtool: "eval-source-map",
}) as ReturnType<typeof __WEBPACK_APPLICATION__>;
