describe("User Onboarding App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  const firstNameInput = () => cy.get("input[name=first_name]");
  const lastNameInput = () => cy.get("input[name=last_name]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const termsInput = () => cy.get("input[name=terms]");
  const submitButton = () => cy.get("button[id='submitButton']");

  it("Sanity check to make sure that tests work", () => {
    expect(1 + 4).to.equal(5);
    expect(3 + 3).not.to.equal(7);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  });

  it("Elements are displaying correctly", () => {
    firstNameInput().should("exist");
    lastNameInput().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
    termsInput().should("exist");
    submitButton().should("exist");
    cy.contains("Submit!").should("exist");
  });

  describe("Filling out the inputs and canceling", () => {
    it("User can navigate to the site", () => {
      cy.url().should("include", "localhost");
    });

    it("Submit button starts out disabled", () => {
      submitButton().should("be.disabled");
    });

    it("User can type in the inputs", () => {
      firstNameInput()
        .should("have.value", "")
        .type("Shanae") //this should match validation rules
        .should("have.value", "Shanae");

      lastNameInput()
        .should("have.value", "")
        .type("Leslie")
        .should("have.value", "Leslie");

      emailInput()
        .should("have.value", "")
        .type("email@email.com")
        .should("have.value", "email@email.com");

      passwordInput()
        .should("have.value", "")
        .type("Password")
        .should("have.value", "Password");

      termsInput().should("not.be.checked").click().should("be.checked");

      it("The submit button enables when all inputs are filled out", () => {
        firstNameInput().type("Shanae");
        lastNameInput().type("Leslie");
        emailInput().type("email@email.com");
        passwordInput().type("Password");
        termsInput().should("be.checked");
        submitButton().should("not.be.disabled");
      });

      it("The submit button does not become enabled when form validation fails", () => {
        firstNameInput().type("");
        lastNameInput().type("");
        emailInput().type("email");
        passwordInput().type("Passw");
        termsInput().should("not.be.checked");
        submitButton().should("be.disabled");
      });

      //   Check for form validation if an input is left empty
    });
  });
});
