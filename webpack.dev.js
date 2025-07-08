const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    open: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,

    client: {
      webSocketURL: {
        hostname: "localhost",
        pathname: "/ws",
        port: 8080,
        protocol: "ws",
      },

      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
