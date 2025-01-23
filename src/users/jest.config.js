module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,ts}",
      "!src/main.ts",  // If you don’t want to test main.ts, remove this line
    ],
    coverageReporters: ["text", "lcov"],
  };
  