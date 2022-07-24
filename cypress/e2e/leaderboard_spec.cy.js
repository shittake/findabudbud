describe("At leaderboard page", () => {
  before(() => {
    cy.visit("/");
    cy.findByRole("button", {
      name: /admin sign in/i,
    }).click();
    cy.findByRole("textbox", {
      name: /email/i,
    }).type("felibunbun13+test1@gmail.com");

    cy.get("#password-required").type("password");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.get('#leaderboard').click();
  });

  it("test", () => {
    cy.findByText(/users online now/i).should("exist");
    cy.findByText(/top 10 users in findabud/i).should("exist");
    cy.get('#table').should("exist");
    cy.findByRole('columnheader', {
      name: /rank/i
      }).should("exist");
    cy.findByRole('columnheader', {
      name: /username/i
      }).should("exist");
    cy.findByRole('columnheader', {
      name: /points/i
      }).should("exist");
    cy.findByRole('columnheader', {
      name: /title/i
      }).should("exist");
    cy.findByRole('columnheader', {
      name: /avatar/i
      }).should("exist");
    cy.findByRole('columnheader', {
      name: /total matches/i
      }).should("exist");
    cy.findByRole('columnheader', {
      name: /average rating/i
      }).should("exist");
  });
});
