const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    "reporter": "mochawesome",
    "reporterOptions": {
      "charts": true,
      "overwrite": false,
      "html": true,
      "json": true,
      "reportDir": "cypress/reports",
      
      "viewportWidth": 1920,
  "viewportHeight": 1080,
  "video": true,
  "screenshotsFolder": "cypress/screenshots",
  "videosFolder": "cypress/videos"

    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
