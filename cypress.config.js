const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,                       // Générer des vidéos
  screenshotOnRunFailure: true,      // Screenshots si un test échoue
  e2e: {
    baseUrl: "https://www.lacoste.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 15000,    // Temps d'attente par commande
    pageLoadTimeout: 60000,          // Temps max de chargement d'une page
    retries: 1                       // Retente une fois en cas d'échec
  }
});
