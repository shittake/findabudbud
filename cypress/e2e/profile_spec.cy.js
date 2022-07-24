describe("At profile page", () => {
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
    cy.get('#profilepage').click();
  });

  it("test", () => {
    cy.findByText(/users online now/i).should("exist");
    cy.findByRole('heading', {
      name: /please key in your profile details:/i
    }).should("exist");
    cy.findByText(/email: felibunbun13\+test1@gmail\.com/i);
  });
});
