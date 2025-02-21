const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        readdir(folder) {
          return fs.readdirSync(folder);
        },
      });
    },
    downloadsFolder: "cypress/downloads", // Ensure downloads are saved here
  },
});
