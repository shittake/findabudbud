describe("At Events Page", () => {
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
    cy.get("#events").click();
    cy.findByText(/welcome to the events page/i).should("exist");
    cy.get(".event-form-button").should("contain", "Add event");
    cy.get(".event-form-button").click();
  });
});

// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(true);
//   });
// });
