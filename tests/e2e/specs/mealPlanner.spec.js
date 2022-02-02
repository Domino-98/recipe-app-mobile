describe("Meal plan page test", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
  });

  it("Shows meal planner page, renders 3 daily recipes, 21 weekly recipes", () => {
    cy.visit("/tabs/search");
    cy.get("[data-cy=mealPlanTab]").click();
    cy.get("[data-cy=day]").click();
    cy.get("[data-cy=generateMealPlan]").type("2000{enter}");
    cy.wait(1000);
    cy.get(".recipe-list-item").should("have.length", "3");
    cy.reload();
    cy.get("[data-cy=week]").click();
    cy.get("[data-cy=generateMealPlan]").clear();
    cy.get("[data-cy=generateMealPlan]").type("2500{enter}");
    cy.wait(1000);
    cy.get(".recipe-list-item").should("have.length", "21");
  });
});
