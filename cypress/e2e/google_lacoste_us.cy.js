describe("Google → Lacoste US", () => {
  it("searches Lacoste US on Google and opens homepage", () => {
    // Aller sur Google
    cy.visit("https://www.google.com");

    // Accepter les cookies si la bannière est présente
    cy.get("body").then($body => {
      if ($body.find("button:contains('Tout accepter')").length) {
        cy.contains("Tout accepter").click({ force: true });
      }
    });

    // Taper la recherche
    cy.get("textarea[name='q']", { timeout: 10000 }).type("Lacoste US{enter}");

    // Cliquer sur le premier résultat qui contient lacoste.com/us
    cy.contains("a", /lacoste\.com\/us/i, { timeout: 20000 })
      .first()
      .click();

    // Vérifier l'URL
    cy.url().should("match", /lacoste\.com\/us/i);

    // Vérifier la présence d'un header (même si captcha)
    cy.get("header", { timeout: 20000 }).should("exist");
  });
});
