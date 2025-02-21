describe("Fetching Trash Schedule", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => false);
  });

  it("should visit the page", () => {
    cy.setCookie("skycms_cookie_modal", "1");
    cy.setCookie("skycms_info_page_layer1", "1");
    cy.wait(500);

    cy.visit(
      "https://turawa.pl/5656/2837/harmonogram-odbioru-odpadow-komunalnych-2024-2025.html",
      {
        failOnStatusCode: false,
      },
    );

    cy.viewport(1000, 660);
    cy.wait(1000);

    cy.get("div").first().click(50, 50, { force: true }).debug();

    cy.get('a[href$=".pdf"]').invoke("removeAttr", "target").click();

    cy.task("readdir", "cypress/downloads").then((files) => {
      const downloadedFile = files.find((file) => file.endsWith(".pdf"));

      expect(downloadedFile).to.exist;

      cy.readFile(`cypress/downloads/${downloadedFile}`, "binary", {
        timeout: 2000,
      }).should("exist");
    });
  });
});

