const { name } = require("./package.json");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true,
  },
  basePath: process.env.NODE_ENV === "production" ? `/${name}` : undefined,
  devIndicators: {
    autoPrerender: false,
  },
});
