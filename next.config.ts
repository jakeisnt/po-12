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
  scope: "/devices/pocket-operator",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  images: {
    remotePatterns: [
      // allow are.na images
      {
        protocol: "https",
        hostname: "d2w9rnfcy7mm78.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.are.na",
        port: "",
        pathname: "/**",
      },
      // support google profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // avatars.githubusercontent.com
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push("sharp");
    }

    // Add path alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
    };

    // audio file support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
    };

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
