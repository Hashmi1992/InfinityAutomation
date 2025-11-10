const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    baseUrl: "https://infinityassettest.constellationfs.com/CFS911xInfinityAsset/Account/Login?ReturnUrl=%2FCFS911xInfinityAsset%2F",
    video: true,
    videoCompression: false,
    videosFolder: 'cypress/videos',
    requestTimeout: 300000,
    responseTimeout: 5000000,
    pageLoadTimeout: 10000000,
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0, 
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome, mocha-junit-reporter',
    mochawesomeReporterOptions: {
      charts: true,
      overwrite: false,
      html: true,
      json: true,
      reportDir: 'cypress/results',
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/results/junit/results-[hash].xml',
      toConsole: false
    }
  }
});
