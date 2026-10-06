export default {
  testRunner: "command",
  commandRunner: {
    command: "npm test",
  },
  mutate: ["scripts/site-contracts.mjs"],
  reporters: ["html", "progress", "clear-text"],
  coverageAnalysis: "perTest",
};
