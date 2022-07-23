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
  });

  it("test", () => {
    cy.findByText(/users online now/i).should("exist");
    //write code for click on match now image action. etc.
  });
});
