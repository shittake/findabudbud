describe("At Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("on login page", () => {
    cy.findByText(
      /hello! you have arrived at findabud's login page :d/i
    ).should("exist");
  });

  it("logging in by magic link", () => {
    cy.findByRole("textbox", {
      name: /required/i,
    })
      .type("felibunbun13@gmail.com")
      .type("{enter}");

    cy.findByText(/sending magic link/i).should("exist");
  });

  it.only("logging in by test user and password", () => {
    cy.findByRole("button", {
      name: /admin sign in/i,
    }).click();
    cy.findByRole("textbox", {
      name: /email/i,
    }).type("felibunbun13+test1@gmail.com");
    // try {
    //   cy.findByRole("textbox", {
    //     name: /password/i,
    //   }).type("password");
    // } catch (error) {
    //   console.log(error);
    //   console.log("theres an error");
    // }
    cy.get("#password-required").type("password");
    cy.findByRole("button", { name: /sign in/i }).click();
  });
});
