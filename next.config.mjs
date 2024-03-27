/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};

export default nextConfig;
