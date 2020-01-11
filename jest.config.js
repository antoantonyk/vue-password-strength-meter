module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: ["./src/components/*.{js,vue}", "!**/node_modules/**"],
  coverageReporters: ["html", "text-summary", "lcov"]
};
