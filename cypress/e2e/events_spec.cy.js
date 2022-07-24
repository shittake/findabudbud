describe("At Events Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 990);
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
    // cy.get(".event-form-button").click();

    //subtest2:
    cy.get("#demo-multiple-checkbox").click({ force: true });
    cy.get(
      '[tabindex="0"] > .MuiListItemText-root > .MuiTypography-root'
    ).click();
    // cy.get("#demo-multiple-checkbox").click();
    cy.get("body").click();

    // cy.get(".MuiBackdrop-root ").click();
    cy.get(".MuiButton-containedGreen").click();
    cy.findByText(/Category: Movies/i).should("not.exist");
    cy.findByText(/Category: Sports/i).should("not.exist");
    cy.findByText(/Category: Study/i).should("not.exist");
    cy.findByText(/Category: Eat/i).should("not.exist");
    cy.findByText(/Category: others/i).should("not.exist");
  });

  it("test 2", () => {
    cy.findByText(/users online now/i).should("exist");
    cy.get("#events").click();
    cy.findByText(/welcome to the events page/i).should("exist");
    cy.get(".MuiButton-containedBlue").click();
    cy.findByText(/here are the events you registered for/i).should("exist");
    cy.get(".MuiButton-containedBlue").click();
    cy.findByText(/welcome to the events page/i).should("exist");
  });

  it("test 3", () => {
    cy.findByText(/users online now/i).should("exist");
    cy.get("#events").click();
    cy.findByText(/welcome to the events page/i).should("exist");
    cy.get("#title").type("in cypress testing mode");
    cy.get(".event-form-button").click();
    cy.findByText(/please fill in this field/i).should("exist");
  });
});

// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(true);
//   });
// });
