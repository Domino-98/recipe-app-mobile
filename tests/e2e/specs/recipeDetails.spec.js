describe("Recipe and ingredient details page", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("Renders recipe and ingredient details", () => {
    cy.visit("/tabs/search");
    cy.get("[data-cy=randomTab]").click();
    cy.wait(1000);
    cy.get("div.img-wrapper").eq(0).click();
    cy.wait(500);
    cy.contains("Number of servings:");
    cy.get("[data-cy=ingredients]").click();
    cy.contains("Used ingredients:");
    cy.get("ion-item").eq(0).click();
    cy.wait(500);
    cy.contains("Nutrients");
    cy.go("back");
    cy.get("[data-cy=steps]").click();
    cy.contains("Instructions:");
  });
});
