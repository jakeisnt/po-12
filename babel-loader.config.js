module.exports = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  //   use: {
  //     loader: 'babel-loader'
  //   }
  presets: [["next/babel"]],
  plugins: [
    // Keep only required plugins
  ],
};
