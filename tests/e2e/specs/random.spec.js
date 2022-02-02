describe("Random recipes page test", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("Shows random page, renders 32 recipes", () => {
    cy.visit("/tabs/search");
    cy.get("[data-cy=randomTab]").click();
    cy.wait(1000);
    cy.get("div.img-wrapper").should("have.length", "32");
  });
});
