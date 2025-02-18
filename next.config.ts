import path from "path";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * A fork of 'next-pwa' that has app directory support
 * @see https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1332258575
 */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  themeColor: "#292525",
  cacheStartUrl: true,
  scope: "/",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2w9rnfcy7mm78.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.are.na",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack(config, { isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
    };

    // Simplified SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Simplified audio handling
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      type: "asset/resource",
    });

    // Shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

const KEYS_TO_OMIT = [
  "webpackDevMiddleware",
  "configOrigin",
  "target",
  "analyticsId",
  "webpack5",
  "amp",
  "assetPrefix",
];

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [[withPWA], [withBundleAnalyzer, {}]];

  const wConfig = plugins.reduce(
    (acc, [plugin, config]) => plugin({ ...acc, ...config }),
    {
      ...defaultConfig,
      ...nextConfig,
    }
  );

  const finalConfig = {};
  Object.keys(wConfig).forEach((key) => {
    if (!KEYS_TO_OMIT.includes(key)) {
      finalConfig[key] = wConfig[key];
    }
  });

  return finalConfig;
};
