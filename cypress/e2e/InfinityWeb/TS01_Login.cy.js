/// <reference types = "cypress"/>

import Handlebars from 'handlebars';
import { LoginPage } from "./loginpage";

describe('Infinity Web Portal', () => {
  // beforeEach(() => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })


  const loginpage = new LoginPage() //can use var, let

  it('TC01: Check for invalid login', () => {

    cy.visit("/")
    cy.viewport(1280, 720)
    // cy.url('').should('eq', "https://infinityassettest.constellationfs.com/CFS817xInfinityasset/Account/Login?ReturnUrl=%2FCFS817xInfinityasset%2F/")


    loginpage.enterUsername('apak')
    cy.wait(1000)

    //cy.get('#password').should('not.have.value', undefined)
    loginpage.enterPassword('apakx')
    cy.wait(1000)

    loginpage.Signin() //signin button click

    cy.get('#login-message').should('be.visible').then(($element) => {
      // This block executes when the element is visible
      const text = $element.text();
      if (text.includes("You have entered an invalid username/password, please try again.")) {
        // Text "APAKX APAK" is not present
        cy.log("Invalid Creds");
      }
    })
    cy.wait(2000)
  })

  it('TC02: Access web and Login to app, also check remember me box', () => {
    //tc02 check for successful login 
    //enter valid email password
    //Click remember me (the test uses browser cookies to save the checkbox and username value)
    //click signin


    //test case 2 Successful login

    loginpage.enterUsername('apak');
    cy.wait(1000);
    loginpage.enterPassword('apak');
    cy.wait(1000);

    // Check Remember Me checkbox and store the username and checkbox value in cookie
    cy.get('#RememberMe').should('be.visible').as('rememberMeCheckbox').invoke('is', ':checked').as('initialRememberMeState');
    cy.get('@initialRememberMeState').then((initial) => {
      if (!initial) {
        cy.get('@rememberMeCheckbox').check();
      }
      // Store the state in a cookie
      cy.setCookie('rememberMe', 'checked');

      // Store the username "APAK" in a cookie
      cy.setCookie('username', 'APAK');
    });

    loginpage.Signin();

    cy.get('#navbarAccount').should('be.visible').then(($element) => {
      // This block executes when the element is visible
      const text = $element.text();
      if (text.includes("APAKX APAK")) {
        // Text "APAKX APAK" is present
        cy.log("Homepage displayed");
      } else {
        // Text "APAKX APAK" is not present
        cy.log("Signin Unsuccessful");
      }
    })
    cy.wait(5000)
  })

  it('TC03: Checking remember password functionality', () => {
    // Assuming the user is on the homepage
    // Verify & click the username dropdown
    // Verify & click the logout button
    // Verify the login page
    // Verify if the username is remembered  (the test uses the saved checkbox and username value,
    // validates it, and then passes the test)

    cy.get('#navbarAccount').should('be.visible').click();
    cy.wait(1000);

    cy.get('form#logoutForm button.btn.btn-primary').should('contain.text', "Sign Out").click();
    cy.wait(1000);

    // Restore the Remember Me state from the cookie
    cy.getCookie('rememberMe').then((rememberMeCookie) => {
      if (rememberMeCookie && rememberMeCookie.value === 'checked') {
        // Check the Remember Me checkbox
        cy.get('#RememberMe').check();
      }
    });

    // Retrieve the username from the cookie
    cy.getCookie('username').then((usernameCookie) => {
      if (usernameCookie) {
        const storedUsername = usernameCookie.value;

        // Get the username entered during the login
        cy.get(loginpage.username_textbox).invoke('val').as('enteredUsername');

        // Validate if the stored username matches the entered username
        cy.get('@enteredUsername').then((enteredUsername) => {
          if (storedUsername === enteredUsername) {
            // The stored username matches the entered username
            // Log a message indicating validation
            cy.log('Username and checkbox are validated');
          } else {
            // Handle the case where the stored username does not match the entered username
            // Log an error or take other appropriate actions
            cy.log('Stored username does not match the entered username');
          }
        });
      }
    })
  })

  it('TC04: Checking for language conversion to French and back to English', () => {
    // As the user is on login , verify it
    // open language dropdown
    // change the language to french
    // assert and verify for french
    // change the language to english


    cy.url('').should('eq', "https://infinityassettest.constellationfs.com/CFS817xInfinityAsset/Account/Login\?ReturnUrl=%2FCFS817xInfinityAsset%2FAccount%2FLogOff");

    cy.get('#dd-language-anony').should('be.visible').select('French')
    cy.wait(2000)
    cy.get('.text-primary').should('contain.text', 'Connexion')
    cy.wait(500)
    cy.get('.ui-outputlabel').should('contain.text', "Nom d’Utilisateur:")
    cy.wait(500)
    cy.get('.ui-outputlabel').should('contain.text', "Mot de Passe:")
    cy.wait(2000)

    //change back to English
    cy.get('#dd-language-anony').should('be.visible').select('English')
    cy.wait(2000)
    cy.get('.text-primary').should('contain.text', 'Sign In')
    cy.wait(500)
    cy.get('.ui-outputlabel').should('contain.text', "Password:")
  })

  it('TC05: Check opening of privacy page', () => {

    cy.visit("/")
    cy.viewport(1280, 720)

    // Click the link to open in a new tab
    cy.get('a[href="https://www.constellationfs.com/Privacy"]').invoke('removeAttr', 'target').click();

    cy.get('.dnnPrivacy > div > :nth-child(1)').should('contain.text', 'Constellation Financial Software is committed to protecting your privacy')

  })

  it('TC06: Check opening of support/contactUs page', () => {

    cy.visit("/")
    cy.viewport(1280, 720)

    // Click the link to open in a new tab
    cy.get('a[href="https://www.constellationfs.com/Contact-Us"]').invoke('attr', 'target', '_self').click();

    cy.get('.not-found-title').should('contain.text', 'No Results Found')

  })
})
