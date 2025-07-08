const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,

      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "story-app-pages",
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://story-api.dicoding.dev/v1/"),
          handler: "NetworkFirst",
          options: {
            cacheName: "story-api-cache",
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://fonts.googleapis.com/") ||
            url.href.startsWith("https://fonts.gstatic.com/"),
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
          },
        },
      ],
    }),
  ],
});
