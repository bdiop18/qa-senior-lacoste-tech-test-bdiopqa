describe("Lacoste FR homepage", () => {
  it("opens the French homepage and checks main UI elements", () => {
    // Ouvrir la homepage FR (même si 403 possible)
    cy.visit("https://www.lacoste.com/fr/", { failOnStatusCode: false });

    // Vérifier header
    cy.get("header", { timeout: 20000 }).should("exist");

    // Vérifier footer
    cy.get("footer", { timeout: 20000 }).should("exist");

    // Vérifier présence d'un menu principal
    cy.contains(/Homme|Femme|Polos/i, { timeout: 20000 }).should("exist");

    // Vérifier que le titre contient "Lacoste"
    cy.title().should("match", /Lacoste/i);
  });
});
