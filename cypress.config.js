const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8aqao6',
  e2e: {

    "baseUrl": "https://infinityassettest.constellationfs.com/CFS818xInfinityasset/Account/Login?ReturnUrl=%2FCFS818xInfinityasset%2F",
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
