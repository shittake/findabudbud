describe("At matching page", () => {
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
    cy.get('#chat').click();
  });

  it("test", () => {
    cy.findByText(/users online now/i).should("exist");
    cy.get('[src="https://avatars.dicebear.com/api/bottts/1000.svg"]').should("exist");
    cy.wait(6000);
    cy.findByText(/matching algorithm has completed./i).should("exist");
  });
});
