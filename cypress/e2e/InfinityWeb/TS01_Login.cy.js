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

        cy.visit("https://infinityassettest.constellationfs.com/CFS816xInfinityasset/Account/Login?ReturnUrl=%2FCFS816xInfinityasset%2F")
      cy.viewport(1280, 720)


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
})

  it('TC02: Access web and Login to app', () => {
      //tc01 homepage and login

  
      //test case 2 Successful login

      loginpage.enterUsername('apak')
      cy.wait(1000)
  
      //cy.get('#password').should('not.have.value', undefined)
      loginpage.enterPassword('apak')
      cy.wait(1000)
  
      loginpage.Signin() //signin button click


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
    })
 })