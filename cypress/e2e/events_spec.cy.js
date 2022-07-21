describe("At Events Page", () => {
  beforeEach(() => {
    cy.visit("/eventspage");
  });

  it("test", () => {
    cy.findByText(/welcome to the events page/i).should("exist");
  });
});

// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(true);
//   });
// });
