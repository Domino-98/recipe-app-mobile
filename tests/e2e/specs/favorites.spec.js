describe("Adding/removing favorite test", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
  });
  it("Adds recipe to favorites, renders favorite page with 1 recipe", () => {
    cy.visit("/tabs/search");
    cy.get("[data-cy=randomTab]").click();
    cy.wait(1000);
    cy.get("div.img-wrapper").eq(0).click();
    cy.wait(500);
    cy.get("[data-cy=favorite]").click();
    cy.go("back");
    cy.get("[data-cy=favoritesTab]").click();
    cy.wait(1000);
    cy.reload();
    cy.get("div.img-wrapper").should("have.length", "1");
  });

  it("Removes favorite recipe, renders favorite page with 0 recipes", () => {
    cy.get("div.img-wrapper").eq(0).click();
    cy.wait(500);
    cy.get("[data-cy=favorite]").click();
    cy.go("back");
    cy.reload();
    cy.get("div.img-wrapper").should("have.length", "0");
  });
});
