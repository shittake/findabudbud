// describe("At Login Page", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });

//   //login
//   it("on login page", () => {
//     cy.findByText(
//       /hello! you have arrived at findabud's login page :d/i
//     ).should("exist");
//   });

//   it("logging in", () => {
//     cy.findByRole("textbox", {
//       name: /required/i,
//     })
//       .type("felibunbun13@gmail.com")
//       .type("{enter}");

//     cy.findByText(/sending magic link/i).should("exist");
//   });
// });
