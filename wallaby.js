module.exports = () => ({
  files: [
    { pattern: "src/**/*.ts", load: false },
    { pattern: "!src/**/*.test.ts", load: true }
  ],

  tests: [
    { pattern: "src/**/*.test.ts", load: true }
  ],
  env: {
    type: "node",
  },
  testFramework: "ava",
  delays: {
    run: 1000,
  },
  filesWithNoCoverageCalculated: ["src/**/*.test.ts"],
})
