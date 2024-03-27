module.exports = {
  test: /\.scss$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: true,
        sourceMap: true,
      },
    },
    "sass-loader",
  ],
};
