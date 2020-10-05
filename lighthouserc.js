module.exports = {
  ci: {
    collect: {
      staticDistDir: "./docs",
      url: [
        "http://localhost/index.html",
        "http://localhost/items.html",
        "http://localhost/settings.html",
        "http://localhost/meal-entry.html",
      ],
      numberOfRuns: 5,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
