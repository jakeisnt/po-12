const path = require("path");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  runtime: "automatic",
                  importSource: "react",
                },
              ],
              [
                "react-css-modules",
                {
                  generateScopedName: "[name]__[local]___[hash:base64:5]",
                  webpackHotModuleReloading: true,
                  filetypes: {
                    ".scss": {
                      syntax: "postcss-scss",
                    },
                  },
                },
              ],
            ],
          },
        },
      },
      // ... other rules ...
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".svg"],
  },
};
