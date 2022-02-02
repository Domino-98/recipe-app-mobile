// https://docs.cypress.io/api/introduction/api.html

describe("Search recipes page tests", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("Renders welcome view", () => {
    cy.visit("/tabs/search");
    cy.contains("Welcome to Recipe App");
  });

  it("Searches for 'Chicken', renders 50 recipes", () => {
    cy.visit("/tabs/search");
    cy.get("[data-cy=searchByIngredients]").type("Chicken{enter}");
    cy.wait(1000);
    cy.get("div.img-wrapper").should("have.length", "50");
  });
});
