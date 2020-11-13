import * as webpack from "webpack";

import ProgressBarPlugin from "progress-bar-webpack-plugin";

import * as path from "path";

const isHMR: boolean = process.env.NODE_ENV === "development";

const plugins: any[] = [
  new ProgressBarPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];

export const __WEBPACK_APPLICATION__ = (
  options: webpack.Configuration
): webpack.Configuration => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), "build"),
      publicPath: "/",
    },
    options.output
  ),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve("tsconfig.app.json"),
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2|png)$/,
        use: "file-loader",
      },
      {
        test: /\.(mp4|webm|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins?.concat(plugins),
  resolve: {
    alias: {
      "@neta": path.resolve(__dirname, "src/"),
    },
    modules: [path.resolve("./node_modules")],
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  target: options.target,
  performance: options.performance || {},
  optimization: options.optimization || {},
  devtool: options.devtool,
});
