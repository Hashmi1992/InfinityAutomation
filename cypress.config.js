const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    "reporter": "mochawesome",
    "reporterOptions": {
      "charts": true,
      "overwrite": false,
      "html": true,
      "json": true,
      "reportDir": "cypress/reports"

    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
